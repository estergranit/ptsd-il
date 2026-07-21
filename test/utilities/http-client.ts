import assert from 'node:assert/strict';

import { API_BASE_URL } from './configuration.ts';

/******************************************************************************************************/

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestArguments {
  path: string;
  token: string;
  expectedStatusCode: number;
  options?: RequestInit;
  dropBody?: boolean;
}

/******************************************************************************************************/

class HttpClient {
  readonly #baseUrl: string;

  public constructor(baseUrl: string = API_BASE_URL) {
    this.#baseUrl = baseUrl;
  }

  public async get(args: RequestArguments) {
    return await this.#request('GET', args);
  }

  public async post(args: RequestArguments) {
    return await this.#request('POST', args);
  }

  public async put(args: RequestArguments) {
    return await this.#request('PUT', args);
  }

  public async patch(args: RequestArguments) {
    return await this.#request('PATCH', args);
  }

  public async delete(args: RequestArguments) {
    return await this.#request('DELETE', args);
  }

  async #request(
    method: HttpMethod,
    { path, token, expectedStatusCode, options, dropBody }: RequestArguments,
  ) {
    const headers = new Headers(options?.headers);
    // eslint-disable-next-line @security/detect-possible-timing-attacks -- test helper: 'none' is a sentinel, not a secret
    if (token !== 'none') {
      headers.set('authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${this.#baseUrl}${path}`, {
      ...options,
      method,
      headers,
    });

    if (response.status !== expectedStatusCode) {
      const text = await response.text();
      assert.fail(
        `${method} ${path} expected ${expectedStatusCode} but got ${response.status}: ${text}`,
      );
    }

    if (dropBody) {
      await response.body?.cancel();
      return;
    }

    return response;
  }
}

/******************************************************************************************************/

export { HttpClient, type RequestArguments };
