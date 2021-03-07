import { Container } from 'inversify';
import { ConfigContainerModule } from '../config/container';
import { DatabaseContainerModule } from '../database/container';
import { LoggerContainerModule } from '../logger/container';
import { SwaggerContainerModule } from '../swagger/container';

const CoreContainer: Container = new Container();

CoreContainer.load(
  ConfigContainerModule,
  LoggerContainerModule,
  SwaggerContainerModule,
  DatabaseContainerModule
);

export { CoreContainer };
