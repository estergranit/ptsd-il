/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { randomString, validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/languages';

async function createLanguage(httpClient: HttpClient, token: string, createdIds: string[]) {
  // 5 hex chars (~1M space, within z.string().min(2).max(5)) to avoid colliding with
  // seeded ISO codes — repo.save() upserts on the PK, so a collision would overwrite a
  // seeded language and the `after` cleanup would then delete it.
  const id = randomString(5);
  const body = { id, name: 'Test Language', direction: 'ltr', isActive: true };

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

suite('Languages integration tests', () => {
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
    test('Valid - admin creates', async () => {
      const { body, created } = await createLanguage(httpClient, admin.token, createdIds);

      assert.strictEqual(created.id, body.id);
      assert.strictEqual(created.name, body.name);
    });

    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ id: 'xx', name: 'Test' }),
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
        body: { id: 'xx', name: 'Test' },
      });
    });

    test('Invalid - moderator cannot create (admin only)', async () => {
      await httpClient.post({
        path: PATH,
        token: moderator.token,
        expectedStatusCode: 403,
        options: {
          body: JSON.stringify({ id: 'xx', name: 'Test' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - bad body', async () => {
      await httpClient.post({
        path: PATH,
        token: admin.token,
        expectedStatusCode: 400,
        options: {
          body: JSON.stringify({ id: 'toolongid', name: '' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Valid - admin updates', async () => {
      const { created } = await createLanguage(httpClient, admin.token, createdIds);

      const response = await httpClient.put({
        path: `${PATH}/${created.id}`,
        token: admin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ name: 'Test Language Updated' }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const body = (await response!.json()) as { name: string };

      assert.strictEqual(body.name, 'Test Language Updated');
    });

    test('Invalid - update without auth', async () => {
      const { created } = await createLanguage(httpClient, admin.token, createdIds);

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
      const { created } = await createLanguage(httpClient, admin.token, createdIds);

      await httpClient.delete({
        path: `${PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });
});
