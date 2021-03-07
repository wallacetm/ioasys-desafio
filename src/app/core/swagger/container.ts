import { ContainerModule } from 'inversify';
import { ExpressSwaggerService } from './express-swagger.service';
import { SwaggerService } from './swagger.service';
import { Express } from 'express';

const CONTAINER_EXPRESS_SWAGGER_SERVICE = Symbol('ExpressSwaggerService');

const SwaggerContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<SwaggerService<Express>>(CONTAINER_EXPRESS_SWAGGER_SERVICE).to(ExpressSwaggerService).inSingletonScope();
});

export { SwaggerContainerModule, CONTAINER_EXPRESS_SWAGGER_SERVICE };