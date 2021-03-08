import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PersonDTO } from './person.dto';

export abstract class PersonEntity {
  constructor(partial: Partial<PersonEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @Column({ name: 'deleted_by' })
  deletedBy: string;

  @DeleteDateColumn({ name: 'deleted_date' })
  deletedDate: Date;

  abstract toDTO(): PersonDTO;
}