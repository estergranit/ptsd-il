import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type * as zod from 'zod';

class ZodValidationPipe<T extends zod.ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error.flatten().fieldErrors);
    }

    return result.data;
  }
}

export { ZodValidationPipe };
