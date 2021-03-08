import { Express } from 'express';
import * as generator from 'express-swagger-generator';
import { inject, injectable } from 'inversify';
import { CONFIG_APPLICATION_DESCRIPTION, CONFIG_APPLICATION_NAME, CONFIG_APPLICATION_VERSION, CONFIG_APPLICATION_BASEDIR } from '../../../constants';
import { ConfigService } from '../config/interfaces';
import { TYPES } from '../containers/types';
import { SwaggerService } from './swagger.service';

@injectable()
export class ExpressSwaggerService implements SwaggerService<Express> {
  @inject(TYPES.CONTAINER_MAP_CONFIG_SERVICE) private readonly config: ConfigService;

  public generate(app: Express): void {
    generator(app)({
      swaggerDefinition: {
        info: {
          description: this.config.get(CONFIG_APPLICATION_DESCRIPTION),
          title: this.config.get(CONFIG_APPLICATION_NAME),
          version: this.config.get(CONFIG_APPLICATION_VERSION),
        },
        produces: ['application/json',],
        schemes: ['http'],
      },
      basedir: this.config.get(CONFIG_APPLICATION_BASEDIR),
      files: [
        './**/*{.controller,.dto,.def}{.ts,.js}'
      ]
    })
  }
}
