import { validateOrReject } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { IncomingMessage } from 'http';
import * as createHttpError from 'http-errors';

export function validate<T>(type: ClassConstructor<T>) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) {
    const originalFunc = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let oldBody: any = null;
      let body: T = null;
      args.forEach((arg) => {
        if (arg instanceof IncomingMessage) {
          oldBody = (arg as any).body;
          body = plainToClass<T, any>(type, oldBody);
        }
      });
      if (body) {
        try {
          if (Array.isArray(body)) {
            for (const item of body) {
              await validateOrReject(item, {
                validationError: { target: false },
                forbidUnknownValues: true,
              });
            }
          } else {
            await validateOrReject(body);
          }
          const oldBodyStr = JSON.stringify(oldBody);
          const bodyIndex = args.findIndex(arg => JSON.stringify(arg) === oldBodyStr);
          if (bodyIndex >= 0) {
            args[bodyIndex] = body;
          }
        } catch (error) {
          const errors = [];

          for (const err of error) {
            const constraints = Object.entries(err.constraints);

            errors.push({
              [err.property]: constraints.map(c => c[1]),
            });
          }
          throw createHttpError(422, 'Invalid request body', { details: errors });
        }
      }
      return originalFunc.apply(this, args);
    };
  };
}
