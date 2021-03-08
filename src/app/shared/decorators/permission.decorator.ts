import { IncomingMessage } from 'http';
import { interfaces } from 'inversify-express-utils';
import { METADATA_HTTP_CONTEXT } from '../../../constants';
import * as createHttpError from 'http-errors';

export function permission<T>(role: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) {
    const originalFunc = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let req = null
      args.forEach((arg) => {
        if (arg instanceof IncomingMessage) {
          req = arg;
        }
      });
      if (req) {
        const httpContext: interfaces.HttpContext = Reflect.getMetadata(METADATA_HTTP_CONTEXT, req);
        const ok = await httpContext.user.isInRole(role);
        if (!ok) {
          throw createHttpError(403, `User dont have role '${role}'`);
        }
      }
      return originalFunc.apply(this, args);
    };
  };
}
