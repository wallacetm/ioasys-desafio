import { ContainerModule } from 'inversify';
import { Connection } from 'typeorm';
import { DatabaseConfiguratorService } from './interfaces';
import { DefaultDatabaseConfiguratorService } from './default-database-configurator.service';

const CONTAINER_DATABASE_CONNECTION = Symbol('DatabaseConnection');
const CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE = Symbol('DefaultDatabaseConfiguratorService');

const DatabaseContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<DatabaseConfiguratorService>(CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE).to(DefaultDatabaseConfiguratorService).inSingletonScope();
  bind<Connection>(CONTAINER_DATABASE_CONNECTION).toDynamicValue(DefaultDatabaseConfiguratorService.getConnection).inRequestScope();
});

export { DatabaseContainerModule, CONTAINER_DATABASE_CONNECTION, CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE };