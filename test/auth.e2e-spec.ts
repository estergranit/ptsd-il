/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { suite, test } from 'node:test';

import { API_BASE_URL } from './utilities/configuration.ts';

/******************************************************************************************************/

const GOOGLE_CONSENT_HOST = /accounts\.google\.com/;

// Auth is Google OAuth only. The real consent flow cannot run headless, so these tests cover the
// parts the server controls: the redirect into Google, and rejection of a callback with no session.

suite('Google OAuth integration tests', () => {
  test('Valid - GET /auth/google redirects to Google consent', async () => {
    const response = await fetch(`${API_BASE_URL}/auth/google`, { redirect: 'manual' });
    await response.body?.cancel();

    assert.strictEqual(response.status, 302);
    const location = response.headers.get('location') ?? '';
    assert.match(location, GOOGLE_CONSENT_HOST);
  });

  test('Invalid - callback without a Google session is rejected', async () => {
    const response = await fetch(`${API_BASE_URL}/auth/google/callback`, { redirect: 'manual' });
    await response.body?.cancel();

    // Passport rejects the unauthenticated callback (401) rather than issuing a token (200).
    assert.notStrictEqual(response.status, 200);
    assert.ok(response.status === 401 || response.status >= 300);
  });
});
