/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/auth/login';

// Mirrors configuration.ts defaults; auth needs the raw password, which configuration
// intentionally does not export (it only exposes resolved tokens).
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL ?? 'admin@ptsd-il.local';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? 'Admin@local123!';

function loginBody(body: unknown) {
  return { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } };
}

/******************************************************************************************************/

suite('Auth integration tests', () => {
  const httpClient = new HttpClient();

  test('Valid - login returns accessToken', async () => {
    const response = await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 201,
      options: loginBody({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
    const body = (await response!.json()) as { accessToken?: unknown };

    assert.strictEqual(typeof body.accessToken, 'string');
  });

  test('Invalid - wrong password', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: loginBody({ email: ADMIN_EMAIL, password: 'wrong-password' }),
      dropBody: true,
    });
  });

  test('Invalid - unknown email', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: loginBody({ email: 'nobody@ptsd-il.local', password: 'any' }),
      dropBody: true,
    });
  });

  test('Invalid - bad body', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 422,
      options: loginBody({ email: 'not-an-email', password: '' }),
      dropBody: true,
    });
  });
});
