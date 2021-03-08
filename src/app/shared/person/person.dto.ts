import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export abstract class PersonDTO {
  constructor(partial: Partial<PersonDTO> = {}) {
    Object.assign(this, partial);
  }

  @IsOptional()
  public readonly uuid: string;

  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail({}, { message: 'Email invalid' })
  public readonly email: string;

  @IsNotEmpty({ message: 'First name cannot be null' })
  @IsString({ message: 'First name is invalid. Should be a valid string' })
  public readonly firstName: string;

  @IsNotEmpty({ message: 'Last name cannot be null' })
  @IsString({ message: 'Last name is invalid. Should be a valid string' })
  public readonly lastName: string;

}