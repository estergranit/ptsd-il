import { UnprocessableEntityException, type PipeTransform } from '@nestjs/common';
import type * as zod from 'zod';

class ZodValidationPipe<T extends zod.ZodType> implements PipeTransform {
  readonly #schema;

  public constructor(schema: T) {
    this.#schema = schema;
  }

  public transform(value: unknown) {
    const result = this.#schema.safeParse(value);

    if (!result.success) {
      throw new UnprocessableEntityException(result.error.issues.map((error) => {
          return error.message;
        }));
    }

    return result.data;
  }
}

export { ZodValidationPipe };
