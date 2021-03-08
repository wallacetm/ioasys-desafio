import { ContainerModule } from 'inversify';
import { ExpressSwaggerService } from './express-swagger.service';
import { SwaggerService } from './swagger.service';
import { Express } from 'express';
import { TYPES } from '../containers/types';

const SwaggerContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<SwaggerService<Express>>(TYPES.CONTAINER_EXPRESS_SWAGGER_SERVICE).to(ExpressSwaggerService).inSingletonScope();
});

export { SwaggerContainerModule };