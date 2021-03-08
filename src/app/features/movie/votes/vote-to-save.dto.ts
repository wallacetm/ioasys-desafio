import { IsNumber, Max, Min } from 'class-validator';
import { VoteEntity } from './vote.entity';

/**
 * @typedef VoteToSave
 * @property {number} rating Vote's rating, from 0 to 4.
 */

export class VoteToSaveDTO {
  constructor(partial: Partial<VoteToSaveDTO> = {}) {
    Object.assign(this, partial)
  }

  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Rating is not a valid number' })
  @Max(4, { message: 'Rating need to be less than or equals to 4' })
  @Min(0, { message: 'Rating need to be greater than or equals to 0' })
  rating: number;

  toEntity(): VoteEntity {
    return new VoteEntity({ rating: this.rating });
  }

}