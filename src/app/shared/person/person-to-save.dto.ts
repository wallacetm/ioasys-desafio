import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PersonDTO } from './person.dto';
import { PersonEntity } from './person.entity';

export abstract class PersonToSaveDTO extends PersonDTO {
  constructor(partial: Partial<PersonToSaveDTO> = {}) {
    super(partial);
  }

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password should be a valid string' })
  @MinLength(6, { message: 'Password need at least 6 characters' })
  public readonly password: string;

  abstract toEntity(): PersonEntity;

}