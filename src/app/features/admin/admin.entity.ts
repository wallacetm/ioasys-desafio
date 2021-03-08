import { Entity } from 'typeorm';
import { PersonEntity } from '../../shared/person/person.entity';
import { AdminDTO } from './admin.dto';

@Entity('admin')
export class AdminEntity extends PersonEntity {
  constructor(partial: Partial<AdminEntity> = {}) {
    super(partial);
  }

  toDTO(): AdminDTO {
    return new AdminDTO({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      uuid: this.uuid
    });
  }
}
