/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/age-groups';
const ADMIN_PATH = '/admin/age-groups';

async function createAgeGroup(httpClient: HttpClient, token: string, createdIds: string[]) {
  const body = { name: 'Adults', min: 18, max: 65 };

  const response = await httpClient.post({
    path: ADMIN_PATH,
    token,
    expectedStatusCode: 201,
    options: { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
  });

  const created = (await response!.json()) as { id: string; name: string; min: number; max: number };
  createdIds.push(created.id);

  return { body, created };
}

/******************************************************************************************************/

suite('Age-groups integration tests', () => {
  const { admin, moderator } = USERS;
  const httpClient = new HttpClient();
  const createdIds: string[] = [];

  after(async () => {
    await Promise.all(
      createdIds.map((id) => {
        return httpClient.delete({
          path: `${ADMIN_PATH}/${id}`,
          token: admin.token,
          expectedStatusCode: 200,
          dropBody: true,
        });
      }),
    );
  });

  suite('Read', () => {
    test('Valid - list returns array', async () => {
      const response = await httpClient.get({ path: PATH, token: 'none', expectedStatusCode: 200 });

      assert.ok(Array.isArray(await response!.json()));
    });
  });

  suite('Create', () => {
    test('Valid - moderator creates', async () => {
      const { created } = await createAgeGroup(httpClient, moderator.token, createdIds);

      assert.strictEqual(created.name, 'Adults');
      assert.strictEqual(created.min, 18);
      assert.strictEqual(created.max, 65);
    });

    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ name: 'Adults', min: 18, max: 65 }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - unauthenticated', async () => {
      await validateUnauthenticated({
        httpClient,
        path: ADMIN_PATH,
        method: 'post',
        body: { name: 'Adults', min: 18, max: 65 },
      });
    });

    test('Invalid - bad body', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 400,
        options: {
          body: JSON.stringify({ name: '', min: -1, max: 0 }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Valid - admin updates', async () => {
      const { created } = await createAgeGroup(httpClient, moderator.token, createdIds);

      const response = await httpClient.put({
        path: `${ADMIN_PATH}/${created.id}`,
        token: admin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ name: 'Adults Updated', min: 20, max: 60 }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const body = (await response!.json()) as { name: string };

      assert.strictEqual(body.name, 'Adults Updated');
    });
  });

  suite('Delete', () => {
    test('Invalid - moderator cannot delete', async () => {
      const { created } = await createAgeGroup(httpClient, moderator.token, createdIds);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });
});
