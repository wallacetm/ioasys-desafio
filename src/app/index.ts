import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { SwaggerService } from './core/swagger/swagger.service';
import { Container } from 'inversify';
import { CONTAINER_EXPRESS_SWAGGER_SERVICE } from './core/swagger/container';
import { Express } from 'express';
import { LoggerService } from './core/logger/interfaces';
import { CONTAINER_CONSOLE_LOGGER_SERVICE } from './core/logger/container';
import './core/ping/ping.controller';

export class App {
  public readonly express: express.Express = express();
  private readonly logger: LoggerService;
  constructor(private readonly container: Container) {
    this.logger = container.get(CONTAINER_CONSOLE_LOGGER_SERVICE);
  }

  initMiddleware() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(this.morganHandler());

    const swagger: SwaggerService<Express> = this.container.get(CONTAINER_EXPRESS_SWAGGER_SERVICE);
    swagger.generate(this.express);
  }

  initErrorMiddleware() {
    this.express.use(this.logErrorHandler());
    this.express.use(this.errorHandler());
  }

  private logErrorHandler() {
    return (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      this.logger.error(err.message);
      next(err);
    }
  }
  private errorHandler() {
    return (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(500).json(err);
    }
  }

  private morganHandler() {
    return morgan(
      ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
      { stream: this.logger.stream() },
    );

  }
}