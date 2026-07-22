/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { validateForbidden, validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const ADMIN_PATH = '/admin/users';

interface SafeUser {
  id: string;
  email: string | null;
  roles: string[];
  password?: string;
}

/******************************************************************************************************/

suite('Users management integration tests', () => {
  const { admin, moderator, masteradmin } = USERS;
  const httpClient = new HttpClient();

  async function findUserByEmail(email: string): Promise<SafeUser> {
    const response = await httpClient.get({
      path: ADMIN_PATH,
      token: masteradmin.token,
      expectedStatusCode: 200,
    });
    const users = (await response!.json()) as SafeUser[];
    const found = users.find((user) => {return user.email === email});
    assert.ok(found, `expected to find user ${email}`);
    return found;
  }

  suite('List', () => {
    test('Valid - masteradmin lists users without passwords', async () => {
      const response = await httpClient.get({
        path: ADMIN_PATH,
        token: masteradmin.token,
        expectedStatusCode: 200,
      });

      const users = (await response!.json()) as SafeUser[];
      assert.ok(Array.isArray(users));
      assert.ok(users.length >= 3);
      for (const user of users) {
        assert.strictEqual(user.password, undefined);
      }
    });

    test('Invalid - admin and moderator forbidden', async () => {
      await validateForbidden({
        httpClient,
        tokens: [admin.token, moderator.token],
        path: ADMIN_PATH,
        method: 'get',
      });
    });

    test('Invalid - unauthenticated', async () => {
      await validateUnauthenticated({ httpClient, path: ADMIN_PATH, method: 'get' });
    });
  });

  suite('Update roles', () => {
    test('Valid - masteradmin changes a user roles', async () => {
      const target = await findUserByEmail(moderator.email);

      const response = await httpClient.put({
        path: `${ADMIN_PATH}/${target.id}/roles`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ roles: ['moderator', 'viewer'] }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const updated = (await response!.json()) as SafeUser;
      assert.deepStrictEqual(updated.roles.toSorted(), ['moderator', 'viewer']);
      assert.strictEqual(updated.password, undefined);

      // Restore original role so re-runs stay stable.
      await httpClient.put({
        path: `${ADMIN_PATH}/${target.id}/roles`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ roles: ['moderator'] }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - empty roles array rejected (422)', async () => {
      const target = await findUserByEmail(moderator.email);

      await httpClient.put({
        path: `${ADMIN_PATH}/${target.id}/roles`,
        token: masteradmin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ roles: [] }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - unknown role value rejected (422)', async () => {
      const target = await findUserByEmail(moderator.email);

      await httpClient.put({
        path: `${ADMIN_PATH}/${target.id}/roles`,
        token: masteradmin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ roles: ['superuser'] }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - unknown user id returns 404', async () => {
      await httpClient.put({
        path: `${ADMIN_PATH}/00000000-0000-0000-0000-000000000000/roles`,
        token: masteradmin.token,
        expectedStatusCode: 404,
        options: {
          body: JSON.stringify({ roles: ['viewer'] }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - non-masteradmin forbidden', async () => {
      const target = await findUserByEmail(moderator.email);

      await validateForbidden({
        httpClient,
        tokens: [admin.token, moderator.token],
        path: `${ADMIN_PATH}/${target.id}/roles`,
        method: 'put',
        body: { roles: ['viewer'] },
      });
    });
  });

  suite('Delete', () => {
    test('Invalid - masteradmin cannot delete self (403)', async () => {
      const self = await findUserByEmail(masteradmin.email);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${self.id}`,
        token: masteradmin.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });

    test('Invalid - unknown user id returns 404', async () => {
      await httpClient.delete({
        path: `${ADMIN_PATH}/00000000-0000-0000-0000-000000000000`,
        token: masteradmin.token,
        expectedStatusCode: 404,
        dropBody: true,
      });
    });

    test('Invalid - non-masteradmin forbidden', async () => {
      const target = await findUserByEmail(moderator.email);

      await validateForbidden({
        httpClient,
        tokens: [admin.token, moderator.token],
        path: `${ADMIN_PATH}/${target.id}`,
        method: 'delete',
      });
    });
  });
});
