import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { SwaggerService } from './core/swagger/swagger.service';
import { Container } from 'inversify';
import { Express } from 'express';
import { LoggerService } from './core/logger/interfaces';
import * as createHttpError from 'http-errors';
import { TYPES } from './core/containers/types';
import { CONFIG_SERVER_NODE_ENV } from '../constants';
import { ConfigService } from './core/config/interfaces';

export class App {
  public readonly express: express.Express = express();
  private readonly logger: LoggerService;
  private readonly config: ConfigService
  constructor(private readonly container: Container) {
    this.logger = container.get(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE);
    this.config = container.get(TYPES.CONTAINER_MAP_CONFIG_SERVICE);
  }

  initMiddleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(this.morganHandler());

    const swagger: SwaggerService<Express> = this.container.get(TYPES.CONTAINER_EXPRESS_SWAGGER_SERVICE);
    swagger.generate(this.express);
  }

  initErrorMiddleware(): void {
    this.express.use(this.clientErrorHandler());
    this.express.use(this.logErrorHandler());
    this.express.use(this.errorHandler());
  }
  private clientErrorHandler(): express.ErrorRequestHandler {
    return (err: createHttpError.UnknownError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      if (createHttpError.isHttpError(err)) {
        next(err);
      } else {
        next(createHttpError(err));
      }
    }
  }
  private logErrorHandler(): express.ErrorRequestHandler {
    return (err: createHttpError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      this.logger.error(err.message, err);
      next(err);
    }
  }
  private errorHandler(): express.ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err: createHttpError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
      res.status(err.statusCode)
      if (err.headers) {
        const headers = Object.keys(err.headers);
        for (const header of headers) {
          res.setHeader(header.toLowerCase(), headers[header]);
        }
        delete err.headers; //delete for DTO.
      }
      if (err.expose || this.config.get(CONFIG_SERVER_NODE_ENV) !== 'production') {
        delete err.expose; //delete for DTO.
        res.json({ message: err.message, stack: err.stack, statusCode: err.statusCode, details: err.details });
      } else {
        res.json({ message: err.message });
      }
    }
  }

  private morganHandler() {
    return morgan(
      ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
      { stream: this.logger.stream() },
    );

  }
}