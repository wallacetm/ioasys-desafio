import { inject, injectable } from 'inversify';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { MovieService } from './interfaces';
import { MovieEntity } from './movie.entity';
import { UserPrincipal } from '../../core/auth/interfaces';
import { LoggerService } from '../../../../dist/src/app/core/logger/interfaces';
import { TYPES } from '../../core/containers/types';
import { MovieDTO } from './movie.dto';
import { MovieToSaveDTO } from './movie-to-save.dto';
import { v4 as uuidV4 } from 'uuid';

@injectable()
export class DefaultMovieService implements MovieService {

  @inject(TYPES.CONTAINER_DATABASE_CONNECTION) connection: Connection;
  @inject(TYPES.SCOPED_USER_PRINCIPAL) private readonly user: UserPrincipal;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;

  get repository(): Repository<MovieEntity> {
    return this.connection.getRepository(MovieEntity);
  }

  async exists(movie: Partial<Pick<MovieDTO, 'name' | 'uuid'>>): Promise<boolean> {
    try {
      const entity = await this.repository.findOne({
        where: [{ name: movie.name }, { uuid: movie.uuid }]
      });
      return !!entity;
    } catch (error) { }
    return false;
  }

  save(movie: MovieToSaveDTO): Promise<MovieDTO> {
    const entity = movie.toEntity();
    entity.createdBy = this.user.details.uuid;
    entity.updatedBy = this.user.details.uuid;
    entity.uuid = uuidV4();
    return this.repository.save(entity).then(entity => entity.toDTO());
  }

  get(uuid: string): Promise<MovieDTO> {
    return this.repository.findOne(uuid);
  }
  getAll(options: FindManyOptions<MovieEntity>): Promise<MovieDTO[]> {
    return this.repository.find(options);
  }

}