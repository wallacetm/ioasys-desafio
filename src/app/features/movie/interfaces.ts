import { MovieDTO } from './movie.dto';
import { MovieToSaveDTO } from './movie-to-save.dto';
import { MovieEntity } from './movie.entity';
import { FindManyOptions } from 'typeorm';
import { VoteToSaveDTO } from './votes/vote-to-save.dto';
export interface MovieService {

  exists(movie: Partial<Pick<MovieDTO, 'name' | 'uuid'>>): Promise<boolean>;
  save(movie: MovieToSaveDTO): Promise<MovieDTO>;
  get(uuid: string): Promise<MovieDTO>;
  getAll(options: FindManyOptions<MovieEntity>): Promise<MovieDTO[]>;
  saveVote(uuid: string, vote: VoteToSaveDTO): Promise<void>
}