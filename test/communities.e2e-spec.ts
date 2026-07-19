/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { randomString, validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/communities';
const ADMIN_PATH = '/admin/communities';
const UNKNOWN_ID = '00000000-0000-0000-0000-000000000000';

type CommunityOverrides = Record<string, unknown>;

function generateCommunity(overrides: CommunityOverrides = {}) {
  return {
    name: `E2E ${randomString(8)}`,
    description: 'Created in e2e test',
    isActive: true,
    ...overrides,
  };
}

async function createCommunity(
  httpClient: HttpClient,
  token: string,
  createdIds: string[],
  overrides: CommunityOverrides = {},
) {
  const body = generateCommunity(overrides);

  const response = await httpClient.post({
    path: ADMIN_PATH,
    token,
    expectedStatusCode: 201,
    options: { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
  });

  const created = (await response!.json()) as { id: string; name: string };
  createdIds.push(created.id);

  return { body, created };
}

/******************************************************************************************************/

suite('Communities integration tests', () => {
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
      const body = (await response!.json()) as unknown;

      assert.ok(Array.isArray(body));
    });

    test('Valid - detail by id', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      const response = await httpClient.get({
        path: `${PATH}/${created.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { id: string };

      assert.strictEqual(body.id, created.id);
    });

    test('Invalid - unknown id returns 404', async () => {
      await httpClient.get({
        path: `${PATH}/${UNKNOWN_ID}`,
        token: 'none',
        expectedStatusCode: 404,
        dropBody: true,
      });
    });
  });

  suite('Create', () => {
    test('Valid - moderator creates', async () => {
      const { body, created } = await createCommunity(httpClient, moderator.token, createdIds);

      assert.strictEqual(created.name, body.name);
    });

    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ name: 'Test Community' }),
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
        body: { name: 'Test Community' },
      });
    });

    test('Invalid - bad contactUrl', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 400,
        options: {
          body: JSON.stringify({ name: 'Test', contactUrl: 'not-a-url' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Valid - moderator updates', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      const response = await httpClient.put({
        path: `${ADMIN_PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ name: 'E2E Test Community Updated' }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const body = (await response!.json()) as { name: string };

      assert.strictEqual(body.name, 'E2E Test Community Updated');
    });
  });

  suite('Delete', () => {
    test('Invalid - moderator cannot delete', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });
});
