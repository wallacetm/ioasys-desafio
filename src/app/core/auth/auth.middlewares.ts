import { BaseMiddleware, interfaces } from 'inversify-express-utils';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import { AuthService } from './interfaces';
import * as createHttpError from 'http-errors';
import { METADATA_HTTP_CONTEXT } from '../../../constants';
import { LoggerService } from '../logger/interfaces';
import { TYPES } from '../containers/types';

@injectable()
export class RequiredAuthMiddleware extends BaseMiddleware {
  @inject(TYPES.CONTAINER_JWT_AUTH_SERVICE) private readonly authService: AuthService;
  handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      next(createHttpError(401, 'User not authenticated'));
    } else if (!authorization.includes('bearer ')) {
      next(createHttpError(401, 'User authorization header invalid'));
    } else {
      const token = authorization.split(' ')[1];
      if (!token) {
        next(createHttpError(401, 'User authorization header invalid'));
      } else {
        this.authService.getUser(token).then(user => {
          const httpContext: interfaces.HttpContext = Reflect.getMetadata(METADATA_HTTP_CONTEXT, req);
          httpContext.container.bind(TYPES.SCOPED_USER_PRINCIPAL).toConstantValue(user);
          next();
        });
      }
    }
  }
}

@injectable()
export class OptionalAuthMiddleware extends BaseMiddleware {
  @inject(TYPES.CONTAINER_JWT_AUTH_SERVICE) private readonly authService: AuthService;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;
  handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const authorization = req.headers['authorization'];
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        this.authService.getUser(token).then(user => {
          const httpContext: interfaces.HttpContext = Reflect.getMetadata(METADATA_HTTP_CONTEXT, req);
          httpContext.container.bind(TYPES.SCOPED_USER_PRINCIPAL).toConstantValue(user);
        });
      } catch (error) {
        this.logger.error(error.message, error);
      }
    }
    next();
  }
}