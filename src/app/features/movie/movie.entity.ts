import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieDTO } from './movie.dto';

@Entity('movie')
export class MovieEntity {
  constructor(partial: Partial<MovieEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'director' })
  director: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column('simple-array', { name: 'actors' })
  actors: string[];

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

  toDTO(): MovieDTO {
    return new MovieDTO({});
  }
}
