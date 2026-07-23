/* eslint-disable @typescript-eslint/no-floating-promises */

import { suite, test } from 'node:test';

import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

// Auth is Google ID-token only: the frontend obtains a Google ID token and posts it here; the
// server verifies it with Google and mints its own JWT. A valid Google token cannot be produced
// headless, so these tests cover request validation and rejection of bogus tokens.

const PATH = '/auth/google';

function jsonBody(body: unknown) {
  return { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } };
}

/******************************************************************************************************/

suite('Google ID-token auth integration tests', () => {
  const httpClient = new HttpClient();

  test('Invalid - missing idToken rejected (422)', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 422,
      options: jsonBody({}),
      dropBody: true,
    });
  });

  test('Invalid - empty idToken rejected (422)', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 422,
      options: jsonBody({ idToken: '' }),
      dropBody: true,
    });
  });

  test('Invalid - bogus idToken rejected (401)', async () => {
    await httpClient.post({
      path: PATH,
      token: 'none',
      expectedStatusCode: 401,
      options: jsonBody({ idToken: 'not-a-real-google-token' }),
      dropBody: true,
    });
  });
});
