import { ContainerModule } from 'inversify';
import { Connection } from 'typeorm';
import { DatabaseConfiguratorService } from './interfaces';
import { DefaultDatabaseConfiguratorService } from './default-database-configurator.service';
import { TYPES } from '../containers/types';

const DatabaseContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<DatabaseConfiguratorService>(TYPES.CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE).to(DefaultDatabaseConfiguratorService).inSingletonScope();
  bind<Connection>(TYPES.CONTAINER_DATABASE_CONNECTION).toDynamicValue(() => DefaultDatabaseConfiguratorService.getConnection()).inRequestScope();
});

export { DatabaseContainerModule };