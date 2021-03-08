import { Container } from 'inversify';
import { AdminContainerModule } from '../../features/admin/container.module';
import { MovieContainerModule } from '../../features/movie/container.module';
import { UserContainerModule } from '../../features/user/container.module';
import { AuthContainerModule } from '../auth/container.module';
import { ConfigContainerModule } from '../config/container.module';
import { DatabaseContainerModule } from '../database/container.module';
import { LoggerContainerModule } from '../logger/container.module';
import { SwaggerContainerModule } from '../swagger/container.module';
import './controllers'; //Load all controllers

const CoreContainer: Container = new Container();

CoreContainer.load(
  ConfigContainerModule,
  LoggerContainerModule,
  SwaggerContainerModule,
  DatabaseContainerModule,
  AuthContainerModule,
  UserContainerModule,
  AdminContainerModule,
  MovieContainerModule
);

export { CoreContainer };
