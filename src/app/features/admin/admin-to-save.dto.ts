import { AdminEntity } from './admin.entity';
import { PersonToSaveDTO } from '../../shared/person/person-to-save.dto';

/**
 * @typedef AdminToSave
 * @property {string} password Admin's password.
 * @property {string} email Admin's first name.
 * @property {string} firstName Admin's first name.
 * @property {string} lastName Admin's last name.
 */


export class AdminToSaveDTO extends PersonToSaveDTO {
  constructor(partial: Partial<AdminToSaveDTO> = {}) {
    super(partial);
  }

  toEntity(): AdminEntity {
    return new AdminEntity({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    });
  }
}