import { Entity } from 'typeorm';
import { PersonEntity } from '../../shared/person/person.entity';
import { UserDTO } from './user.dto';

@Entity('user')
export class UserEntity extends PersonEntity {
  constructor(partial: Partial<UserEntity> = {}) {
    super(partial);
  }

  toDTO(): UserDTO {
    return new UserDTO({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      uuid: this.uuid
    });
  }
}
