import { MovieDTO } from './movie.dto';
import { MovieEntity } from './movie.entity';

/**
 * @typedef MovieToSave
 * @property {string} director Movie's director name.
 * @property {string} name Movie's name.
 * @property {string} gender Movie's gender name.
 * @property {Array<string>} actors Movie's actors list name.
 */

export class MovieToSaveDTO extends MovieDTO {
  constructor(partial: Partial<MovieToSaveDTO> = {}) {
    super({ ...partial, uuid: undefined });
  }

  toEntity(): MovieEntity {
    return new MovieEntity({
      name: this.name,
      gender: this.gender,
      actors: this.actors,
      director: this.director
    });
  }

}