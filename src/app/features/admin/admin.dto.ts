import { PersonDTO } from '../../shared/person/person.dto';

/**
 * @typedef Admin
 * @property {string} uuid Auto generated UUID string that represents the admin primary id.
 * @property {string} email Admin's first name.
 * @property {string} firstName Admin's first name.
 * @property {string} lastName Admin's last name.
 */

export class AdminDTO extends PersonDTO {
  constructor(partial: Partial<AdminDTO> = {}) {
    super(partial)
  }

}