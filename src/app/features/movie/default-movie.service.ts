import { inject, injectable } from 'inversify';
import { Connection, FindManyOptions, Repository } from 'typeorm';
import { MovieService } from './interfaces';
import { MovieEntity } from './movie.entity';
import { UserPrincipal } from '../../core/auth/interfaces';
import { TYPES } from '../../core/containers/types';
import { MovieDTO } from './movie.dto';
import { MovieToSaveDTO } from './movie-to-save.dto';
import { v4 as uuidV4 } from 'uuid';
import { VoteToSaveDTO } from './votes/vote-to-save.dto';
import { VoteEntity } from './votes/vote.entity';
import { LoggerService } from '../../core/logger/interfaces';

@injectable()
export class DefaultMovieService implements MovieService {

  @inject(TYPES.CONTAINER_DATABASE_CONNECTION) connection: Connection;
  @inject(TYPES.SCOPED_USER_PRINCIPAL) private readonly user: UserPrincipal;
  @inject(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE) private readonly logger: LoggerService;

  get repository(): Repository<MovieEntity> {
    return this.connection.getRepository(MovieEntity);
  }

  get votesRepository(): Repository<VoteEntity> {
    return this.connection.getRepository(VoteEntity);
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
    return this.repository.findOne(uuid, { relations: ['votes'] }).then(entity => entity.toDTO());
  }
  getAll(options: FindManyOptions<MovieEntity>): Promise<MovieDTO[]> {
    return this.repository.find(options).then(entities => entities.map(entity => entity.toDTO()));
  }

  async saveVote(uuid: string, vote: VoteToSaveDTO): Promise<void> {
    try {
      let entity = await this.votesRepository.findOne({
        where: {
          movieUuid: uuid,
          votedBy: this.user.details.uuid
        }
      });
      if (entity) {
        entity.rating = vote.rating;
      } else {
        entity = vote.toEntity();
        entity.votedBy = this.user.details.uuid;
        entity.movieUuid = uuid;
      }
      await this.votesRepository.save(entity);
    } catch (error) {
      throw error;
    }
  }

}