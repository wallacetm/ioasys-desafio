
/**
 * @typedef Movie
 * @property {string} uuid Auto generated UUID string that represents the admin primary id.
 * @property {string} director Movie's director name.
 * @property {string} name Movie's name.
 * @property {string} gender Movie's gender name.
 * @property {Array<string>} actors Movie's actors list name.
 */

import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MovieDTO {
  constructor(partial: Partial<MovieDTO> = {}) {
    Object.assign(this, partial);
  }
  @IsOptional()
  public readonly uuid: string;

  @IsNotEmpty({ message: 'Director name cannot be null' })
  @IsString({ message: 'Director name invalid' })
  public readonly director: string;

  @IsNotEmpty({ message: 'Movie name cannot be null' })
  @IsString({ message: 'Movie name invalid' })
  public readonly name: string;

  @IsNotEmpty({ message: 'Gender name cannot be null' })
  @IsString({ message: 'Gender name invalid' })
  public readonly gender: string;

  @ArrayNotEmpty({ message: 'Actors list name cannot be null or empty' })
  @IsArray({ message: 'Actors list need to be a list' })
  @IsString({ each: true, message: 'Actors list should be a valid array of strings' })
  public readonly actors: string[];

  @IsOptional()
  public readonly ratingAvg?: number;
}