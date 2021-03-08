import 'reflect-metadata';
import { Express } from 'express';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { App } from './app/index';
import { CoreContainer } from './app/core/containers/inversify.config';
import { ConfigService } from './app/core/config/interfaces';
import { CONFIG_SERVER_PORT } from './constants';
import { LoggerService } from './app/core/logger/interfaces';
import { name, version, description, keywords } from '../package.json';
import { DatabaseConfiguratorService } from './app/core/database/interfaces';
import { TYPES } from './app/core/containers/types';

async function bootstrap() {
  const config = CoreContainer.get<ConfigService>(TYPES.CONTAINER_MAP_CONFIG_SERVICE);

  config.mapObject({
    Application: {
      Name: name,
      Version: version,
      Description: description,
      Keywords: keywords,
      BaseDir: __dirname
    },
    Server: {
      Port: process.env['PORT'],
      NodeEnv: process.env['NODE_ENV']
    },
    Database: {
      Host: process.env['DATABASE_HOST'],
      Port: process.env['DATABASE_PORT'],
      Name: process.env['DATABASE_NAME'],
      User: process.env['DATABASE_USER'],
      Pass: process.env['DATABASE_PASS'],
      Logging: false,
    },
    Auth: {
      Secret: process.env['AUTH_SECRET']
    }
  });

  const logger = CoreContainer.get<LoggerService>(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE);
  const databaseConfigurator = CoreContainer.get<DatabaseConfiguratorService>(TYPES.CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE);

  const app = new App(CoreContainer);
  const express: Express = app.express;
  const server = new InversifyExpressServer(
    CoreContainer,
    null,
    null,
    express,
    null
  );
  const port = config.get(CONFIG_SERVER_PORT, 3000);
  express.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        logger.error(`The port ${port} need elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        logger.error(`The port ${port} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
  });

  await tryConnection(databaseConfigurator);

  const application = server.setConfig(app.initMiddleware.bind(app)).setErrorConfig(app.initErrorMiddleware.bind(app)).build();
  getRouteInfo(CoreContainer).forEach(route => {
    logger.info(`[CONTROLLER] '${route.controller}' registrated`);
    route.endpoints.forEach(endpoint => logger.info(`[ENDPOINT] '${endpoint.route}'`));
  });

  application.listen(port, () => logger.info(`Listening on port ${port}`));

  process.on('SIGINT', function (msg) {
    logger.info('SIGINT received', msg);
    process.exit(0);
  });

  process.on('SIGTERM', function (msg) {
    logger.info('SIGTERM received', msg);
    process.exit(0);
  });

}

async function tryConnection(databaseConfigurator: DatabaseConfiguratorService, tries = 0): Promise<boolean> {
  try {
    await databaseConfigurator.configure();
    return true;
  } catch {
    if (tries >= 5) {
      process.exit(1);
    }
    await sleep(1000);
    return tryConnection(databaseConfigurator, tries + 1);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

bootstrap();