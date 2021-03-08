import { UserEntity } from './user.entity';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

/**
 * @typedef UserToSave
 * @property {string} password User's password.
 * @property {string} email User's first name.
 * @property {string} firstName User's first name.
 * @property {string} lastName User's last name.
 */


export class UserToSaveDTO extends PersonToSaveDTO {
  constructor(partial: Partial<UserToSaveDTO> = {}) {
    super(partial);
  }

  toEntity(): UserEntity {
    return new UserEntity({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    });
  }
}