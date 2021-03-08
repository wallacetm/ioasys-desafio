import { ContainerModule } from 'inversify';
import { TYPES } from '../containers/types';
import { ConfigService } from './interfaces';
import { MapConfigService } from './map-config.service';

const ConfigContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<ConfigService>(TYPES.CONTAINER_MAP_CONFIG_SERVICE).to(MapConfigService).inSingletonScope();
});

export { ConfigContainerModule };