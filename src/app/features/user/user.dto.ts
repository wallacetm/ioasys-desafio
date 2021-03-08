import { PersonDTO } from '../../shared/person/person.dto';

/**
 * @typedef User
 * @property {string} uuid Auto generated UUID string that represents the user primary id.
 * @property {string} email User's first name.
 * @property {string} firstName User's first name.
 * @property {string} lastName User's last name.
 */

export class UserDTO extends PersonDTO {
  constructor(partial: Partial<UserDTO> = {}) {
    super(partial)
  }

}