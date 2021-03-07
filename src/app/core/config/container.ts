import { ContainerModule } from 'inversify';
import { ConfigService } from './interfaces';
import { MapConfigService } from './map-config.service';

const CONTAINER_MAP_CONFIG_SERVICE = Symbol('MapConfigService');

const ConfigContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<ConfigService>(CONTAINER_MAP_CONFIG_SERVICE).to(MapConfigService).inSingletonScope();
});

export { ConfigContainerModule, CONTAINER_MAP_CONFIG_SERVICE };