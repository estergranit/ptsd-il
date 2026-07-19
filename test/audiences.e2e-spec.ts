/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { randomString, validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/audiences';

async function createAudience(httpClient: HttpClient, token: string, createdIds: string[]) {
  const body = { name: `E2E ${randomString(8)}`, description: 'Test audience' };

  const response = await httpClient.post({
    path: PATH,
    token,
    expectedStatusCode: 201,
    options: { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
  });

  const created = (await response!.json()) as { id: string; name: string };
  createdIds.push(created.id);

  return { body, created };
}

/******************************************************************************************************/

suite('Audiences integration tests', () => {
  const { admin, moderator } = USERS;
  const httpClient = new HttpClient();
  const createdIds: string[] = [];

  after(async () => {
    await Promise.all(
      createdIds.map((id) => {
        return httpClient.delete({
          path: `${PATH}/${id}`,
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
      const { body, created } = await createAudience(httpClient, moderator.token, createdIds);

      assert.strictEqual(created.name, body.name);
    });

    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ name: 'Veterans' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - unauthenticated', async () => {
      await validateUnauthenticated({
        httpClient,
        path: PATH,
        method: 'post',
        body: { name: 'Veterans' },
      });
    });

    test('Invalid - bad body', async () => {
      await httpClient.post({
        path: PATH,
        token: admin.token,
        expectedStatusCode: 400,
        options: {
          body: JSON.stringify({ name: '' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Valid - admin updates', async () => {
      const { created } = await createAudience(httpClient, moderator.token, createdIds);

      const response = await httpClient.put({
        path: `${PATH}/${created.id}`,
        token: admin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ name: 'E2E Veterans Updated' }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const body = (await response!.json()) as { name: string };

      assert.strictEqual(body.name, 'E2E Veterans Updated');
    });

    test('Invalid - update without auth', async () => {
      const { created } = await createAudience(httpClient, moderator.token, createdIds);

      await httpClient.put({
        path: `${PATH}/${created.id}`,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ name: 'Should fail' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Delete', () => {
    test('Invalid - moderator cannot delete', async () => {
      const { created } = await createAudience(httpClient, moderator.token, createdIds);

      await httpClient.delete({
        path: `${PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });
});
