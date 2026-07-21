import { randomUUID } from 'node:crypto';
import type { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'node:http';
import { join } from 'node:path';

import type { ConfigService as ConfigurationService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';
import PinoHttp from 'pino-http';

import type { Configuration } from './configuration.ts';

/******************************************************************************************************/

const REQUEST_HEADER_NAMES = new Set([
  'accept',
  'authorization',
  'accept-encoding',
  'content-type',
  'user-agent',
  'referer',
  'origin',
] as const);
const RESPONSE_HEADER_NAMES = new Set(['cache-control', 'content-length', 'content-type'] as const);

/******************************************************************************************************/

function configureLogger(configurationService: ConfigurationService<Configuration, true>) {
  const healthcheckRoutes = new Set(
    configurationService
      .get('server.healthcheckRoutes', {
        infer: true,
      })
      .map((route) => {
        return `/${route}`;
      }),
  );

  return {
    pinoHttp: {
      transport: {
            target: 'pino-roll',
            options: {
              file: join(import.meta.dirname, '..', '..', 'logs', 'ptsd_api'),
              mkdir: true,
              frequency: 'daily',
              dateFormat: 'yyyy-MM-dd',
              extension: '.log',
              size: '16m',
              limit: { count: 13 }, // 13 rotated + 1 active => 14 days retention
            },
          },
      genReqId: (_request: IncomingMessage, response: ServerResponse) => {
        const requestId = randomUUID();
        response.setHeader('X-Request-Id', requestId);

        return requestId;
      },
      autoLogging: {
        ignore: (request: IncomingMessage) => {
          return healthcheckRoutes.has(request.url!);
        },
      },
      customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken',
        reqId: 'requestId',
      },
      redact: {
        paths: ['request.headers.authorization', 'request.headers.cookie'],
        remove: true,
      },
      quietReqLogger: true,
      base: null,
      wrapSerializers: false,
      formatters: {
        // Change level from a number to a string, for example: "level: 30" will be "level: info"
        level(label) {
          return { level: label } as const;
        },
      },
      serializers: {
        request(request: IncomingMessage) {
          const serializedRequest = PinoHttp.stdSerializers.req(request);

          return {
            method: serializedRequest.method,
            url: serializedRequest.url,
            path: serializedRequest.params,
            query: serializedRequest.query,
            headers: buildHeaders(serializedRequest.headers, REQUEST_HEADER_NAMES),
          } as const;
        },
        response(response: ServerResponse) {
          return {
            status: response.statusCode,
            headers: buildHeaders(response.getHeaders(), RESPONSE_HEADER_NAMES),
          } as const;
        },
        error(error: Error) {
          const { stack, raw, cause, ...errorFields } = PinoHttp.stdSerializers.err(error);
          let additionalDetails: { [key: string]: unknown } = {};
          if ('toJSON' in error && typeof error.toJSON === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            additionalDetails = error.toJSON();
          }

          return Object.assign(errorFields, additionalDetails);
        },
      },
    },
  } satisfies Params;
}

/******************************************************************************************************/

function buildHeaders(
  headers: { [key: string]: string } | OutgoingHttpHeaders,
  headerNames: Set<string>,
) {
  const serializedHeaders: { [key: string]: string } = {};
  for (const headerName of headerNames) {
    const value = headers[headerName];
    if (value) {
      serializedHeaders[headerName] = String(value);
    }
  }

  return serializedHeaders;
}

/******************************************************************************************************/

export { configureLogger };
