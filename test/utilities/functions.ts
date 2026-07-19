import { randomBytes } from 'node:crypto';

import type { HttpClient } from './http-client.ts';

/******************************************************************************************************/

type HttpMethodName = 'get' | 'post' | 'put' | 'patch' | 'delete';

/******************************************************************************************************/

function randomString(length: number): string {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

async function validateUnauthenticated(params: {
  httpClient: HttpClient;
  path: string;
  method: HttpMethodName;
  body?: unknown;
}): Promise<void> {
  const { httpClient, path, method, body } = params;

  await httpClient[method]({
    path,
    token: 'none',
    expectedStatusCode: 401,
    dropBody: true,
    options:
      body === undefined
        ? undefined
        : { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
  });
}

async function validateForbidden(params: {
  httpClient: HttpClient;
  tokens: string[];
  path: string;
  method: HttpMethodName;
  body?: unknown;
}): Promise<void> {
  const { httpClient, tokens, path, method, body } = params;

  await Promise.all(
    tokens.map((token) => {
      return httpClient[method]({
        path,
        token,
        expectedStatusCode: 403,
        dropBody: true,
        options:
          body === undefined
            ? undefined
            : { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
      });
    }),
  );
}

/******************************************************************************************************/

export { randomString, validateForbidden, validateUnauthenticated, type HttpMethodName };
