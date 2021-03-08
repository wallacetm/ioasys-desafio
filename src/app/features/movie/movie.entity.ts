import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieDTO } from './movie.dto';
import { VoteEntity } from './votes/vote.entity';

@Entity('movies')
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

  @OneToMany(() => VoteEntity, entity => entity.movieUuid, { lazy: true, eager: false })
  votes: VoteEntity[];

  toDTO(): MovieDTO {
    return new MovieDTO({
      actors: this.actors,
      director: this.director,
      gender: this.gender,
      name: this.name,
      uuid: this.uuid,
      ratingAvg: this.votes && this.votes.length > 0 ? +(this.votes.reduce((total, vote) => total + vote.rating, 0) / this.votes.length).toFixed(1) : undefined
    });
  }
}
