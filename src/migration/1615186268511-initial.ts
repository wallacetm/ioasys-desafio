import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1615186268511 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE SCHEMA ioasys AUTHORIZATION postgres;');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    //Admins
    await queryRunner.query(`
    CREATE TABLE ioasys.admins (
      uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
      email varchar NOT NULL,
      "password" varchar NOT NULL,
      first_name varchar NOT NULL,
      last_name varchar NOT NULL,
      created_by varchar NOT NULL,
      created_date timestamp NOT NULL DEFAULT now(),
      updated_by varchar NOT NULL,
      updated_date timestamp NOT NULL DEFAULT now(),
      deleted_by varchar NULL,
      deleted_date timestamp NULL,
      CONSTRAINT "PK_67886e6e5dbc7072a49c148118d" PRIMARY KEY (uuid)
    );`);
    //Movies
    await queryRunner.query(`
    CREATE TABLE ioasys.movies (
      uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
      director varchar NOT NULL,
      "name" varchar NOT NULL,
      gender varchar NOT NULL,
      actors text NOT NULL,
      created_by varchar NOT NULL,
      created_date timestamp NOT NULL DEFAULT now(),
      updated_by varchar NOT NULL,
      updated_date timestamp NOT NULL DEFAULT now(),
      deleted_by varchar NULL,
      deleted_date timestamp NULL,
      CONSTRAINT "PK_69d3e7bb121f3475c8f465be768" PRIMARY KEY (uuid)
    );`);
    //Users
    await queryRunner.query(`
    CREATE TABLE ioasys.users(
      uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
      email varchar NOT NULL,
      "password" varchar NOT NULL,
      first_name varchar NOT NULL,
      last_name varchar NOT NULL,
      created_by varchar NOT NULL,
      created_date timestamp NOT NULL DEFAULT now(),
      updated_by varchar NOT NULL,
      updated_date timestamp NOT NULL DEFAULT now(),
      deleted_by varchar NULL,
      deleted_date timestamp NULL,
      CONSTRAINT "PK_8d8a6d130f1db8e2bc0423d914e" PRIMARY KEY(uuid)
    );`);
    //Votes
    await queryRunner.query(`
    CREATE TABLE ioasys.votes(
      uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
      rating int4 NOT NULL,
      movie_uuid uuid NOT NULL,
      voted_by varchar NOT NULL,
      voted_date timestamp NOT NULL DEFAULT now(),
      CONSTRAINT "PK_d5af914e96d281a35fab60ca1e2" PRIMARY KEY(uuid),
      CONSTRAINT "FK_091fefbf99ae818a8e57813dbe3" FOREIGN KEY(movie_uuid) REFERENCES ioasys.movies(uuid)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE ioasys.admins;');
    await queryRunner.query('DROP TABLE ioasys.movies;');
    await queryRunner.query('DROP TABLE ioasys.users;');
    await queryRunner.query('DROP TABLE ioasys.votes;');
  }

}

//Copied generetad DDL from DBeaver version 7.0.4