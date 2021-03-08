import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieEntity } from '../movie.entity';

@Entity('votes')
export class VoteEntity {
  constructor(partial: Partial<VoteEntity> = {}) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'rating' })
  rating: number;

  @Column('uuid', { name: 'movie_uuid' })
  movieUuid: string;

  @Column({ name: 'voted_by' })
  votedBy: string;

  @UpdateDateColumn({ name: 'voted_date' })
  votedDate: Date;

  @ManyToOne(() => MovieEntity)
  @JoinColumn({ name: 'movie_uuid' })
  movie: MovieEntity;

}
