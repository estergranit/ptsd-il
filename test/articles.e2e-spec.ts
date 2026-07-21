/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/articles';
const ADMIN_PATH = '/admin/articles';
const UNKNOWN_ID = '00000000-0000-0000-0000-000000000000';

/******************************************************************************************************/

suite('Articles integration tests', () => {
  const { admin, moderator } = USERS;
  const httpClient = new HttpClient();

  suite('Read', () => {
    test('Valid - public list returns array (published only)', async () => {
      const response = await httpClient.get({ path: PATH, token: 'none', expectedStatusCode: 200 });

      assert.ok(Array.isArray(await response!.json()));
    });

    test('Valid - public list filtered by categorySlug returns array', async () => {
      const response = await httpClient.get({
        path: `${PATH}?categorySlug=rights`,
        token: 'none',
        expectedStatusCode: 200,
      });

      assert.ok(Array.isArray(await response!.json()));
    });

    test('Invalid - categorySlug with illegal chars', async () => {
      await httpClient.get({
        path: `${PATH}?categorySlug=Not_A_Slug`,
        token: 'none',
        expectedStatusCode: 422,
        dropBody: true,
      });
    });

    test('Invalid - public single unknown id returns 404', async () => {
      await httpClient.get({
        path: `${PATH}/${UNKNOWN_ID}`,
        token: 'none',
        expectedStatusCode: 404,
        dropBody: true,
      });
    });

    test('Invalid - public single unpublished article returns 404', async () => {
      const createResponse = await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 201,
        options: {
          body: JSON.stringify({ langId: 'en', title: 'Unpublished', isPublished: false }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const { id } = (await createResponse!.json()) as { id: string };

      try {
        // Public endpoint hides it...
        await httpClient.get({
          path: `${PATH}/${id}`,
          token: 'none',
          expectedStatusCode: 404,
          dropBody: true,
        });

        // ...but admin can still fetch it (proves it exists, only publish state hides it).
        await httpClient.get({
          path: `${ADMIN_PATH}/${id}`,
          token: admin.token,
          expectedStatusCode: 200,
          dropBody: true,
        });
      } finally {
        await httpClient.delete({
          path: `${ADMIN_PATH}/${id}`,
          token: admin.token,
          expectedStatusCode: 200,
          dropBody: true,
        });
      }
    });

    test('Invalid - admin list without auth', async () => {
      await httpClient.get({
        path: ADMIN_PATH,
        token: 'none',
        expectedStatusCode: 401,
        dropBody: true,
      });
    });

    test('Valid - admin list with moderator', async () => {
      const response = await httpClient.get({
        path: ADMIN_PATH,
        token: moderator.token,
        expectedStatusCode: 200,
      });

      assert.ok(Array.isArray(await response!.json()));
    });
  });

  suite('Create', () => {
    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ langId: 'en', title: 'Test' }),
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
        body: { langId: 'en', title: 'Test' },
      });
    });

    test('Invalid - langId too long (max 5 chars)', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ langId: 'english', title: 'Test Article' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - empty title', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ langId: 'en', title: '' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Invalid - patch without auth', async () => {
      await httpClient.patch({
        path: `${ADMIN_PATH}/${UNKNOWN_ID}`,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ title: 'Updated' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Delete', () => {
    test('Invalid - moderator cannot delete', async () => {
      await httpClient.delete({
        path: `${ADMIN_PATH}/${UNKNOWN_ID}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });
});
