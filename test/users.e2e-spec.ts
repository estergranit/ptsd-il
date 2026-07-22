/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { API_BASE_URL, USERS } from './utilities/configuration.ts';
import { randomString, validateForbidden, validateUnauthenticated } from './utilities/functions.ts';
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

  suite('Create', () => {
    test('Valid - masteradmin creates a user, then deletes it', async () => {
      const email = `e2e-${randomString(8)}@ptsd-il.local`;
      const createResponse = await httpClient.post({
        path: ADMIN_PATH,
        token: masteradmin.token,
        expectedStatusCode: 201,
        options: {
          body: JSON.stringify({
            firstName: 'Test',
            lastName: 'User',
            email,
            password: 'Created@local123!',
          }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const created = (await createResponse!.json()) as SafeUser & { id: string };
      assert.strictEqual(created.password, undefined);
      assert.deepStrictEqual(created.roles, ['viewer']);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${created.id}`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        dropBody: true,
      });
      await httpClient.delete({
        path: `${ADMIN_PATH}/${created.id}`,
        token: masteradmin.token,
        expectedStatusCode: 404,
        dropBody: true,
      });
    });

    test('Invalid - duplicate email returns 409', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: masteradmin.token,
        expectedStatusCode: 409,
        options: {
          body: JSON.stringify({
            firstName: 'Dupe',
            lastName: 'User',
            email: moderator.email,
            password: 'Created@local123!',
          }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - bad body rejected (422)', async () => {
      const bodies = [
        { lastName: 'User', email: `e2e-${randomString(8)}@x.io`, password: 'Created@local123!' },
        { firstName: 'T', lastName: 'User', email: `e2e-${randomString(8)}@x.io`, password: 'short' },
        { firstName: 'T', lastName: 'User', email: 'not-an-email', password: 'Created@local123!' },
      ];
      await Promise.all(
        bodies.map((body) => {
          return httpClient.post({
            path: ADMIN_PATH,
            token: masteradmin.token,
            expectedStatusCode: 422,
            options: { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
            dropBody: true,
          });
        }),
      );
    });

    test('Invalid - non-masteradmin forbidden', async () => {
      await validateForbidden({
        httpClient,
        tokens: [admin.token, moderator.token],
        path: ADMIN_PATH,
        method: 'post',
        body: { firstName: 'T', lastName: 'U', email: `e2e-${randomString(8)}@x.io`, password: 'Created@local123!' },
      });
    });

    test('Invalid - unauthenticated', async () => {
      await validateUnauthenticated({
        httpClient,
        path: ADMIN_PATH,
        method: 'post',
        body: { firstName: 'T', lastName: 'U', email: `e2e-${randomString(8)}@x.io`, password: 'Created@local123!' },
      });
    });
  });

  suite('Admin reset password', () => {
    // eslint-disable-next-line @unicorn/consistent-function-scoping
    async function createThrowawayUser(password: string): Promise<SafeUser & { id: string }> {
      const email = `e2e-${randomString(8)}@ptsd-il.local`;
      const response = await httpClient.post({
        path: ADMIN_PATH,
        token: masteradmin.token,
        expectedStatusCode: 201,
        options: {
          body: JSON.stringify({ firstName: 'Reset', lastName: 'Target', email, password }),
          headers: { 'content-type': 'application/json' },
        },
      });
      return (await response!.json()) as SafeUser & { id: string };
    }

    // eslint-disable-next-line @unicorn/consistent-function-scoping
    async function loginStatus(email: string, password: string): Promise<number> {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      await response.body?.cancel();
      return response.status;
    }

    test('Valid - masteradmin resets password; user logs in with new password', async () => {
      const user = await createThrowawayUser('OldPass@123!');

      await httpClient.put({
        path: `${ADMIN_PATH}/${user.id}/password`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ newPassword: 'NewPass@456!' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });

      assert.strictEqual(await loginStatus(user.email!, 'NewPass@456!'), 201);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${user.id}`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        dropBody: true,
      });
    });

    test('Invalid - unknown user id returns 404', async () => {
      await httpClient.put({
        path: `${ADMIN_PATH}/00000000-0000-0000-0000-000000000000/password`,
        token: masteradmin.token,
        expectedStatusCode: 404,
        options: {
          body: JSON.stringify({ newPassword: 'NewPass@456!' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - short password rejected (422)', async () => {
      const user = await createThrowawayUser('OldPass@123!');
      await httpClient.put({
        path: `${ADMIN_PATH}/${user.id}/password`,
        token: masteradmin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ newPassword: 'short' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
      await httpClient.delete({
        path: `${ADMIN_PATH}/${user.id}`,
        token: masteradmin.token,
        expectedStatusCode: 200,
        dropBody: true,
      });
    });

    test('Invalid - non-masteradmin forbidden', async () => {
      await validateForbidden({
        httpClient,
        tokens: [admin.token, moderator.token],
        path: `${ADMIN_PATH}/00000000-0000-0000-0000-000000000000/password`,
        method: 'put',
        body: { newPassword: 'NewPass@456!' },
      });
    });
  });
});
