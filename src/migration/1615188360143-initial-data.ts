import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialData1615188360143 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO ioasys.admins
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('78774f63-3596-4d7f-badc-7e7a59169b0d', 'wallace.reetz@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:18:26.461', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:18:26.461', NULL, NULL) ON CONFLICT DO NOTHING;
    `)
    await queryRunner.query(`
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('a54a1a42-b86a-4208-814b-611017dbec03', 'wall.ree1@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace2', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.189', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.189', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('78524a2e-7c83-4ef1-9e3e-76fdf4b10f1c', 'wall.ree2@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace3', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.195', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.195', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('36d3258a-d131-42a6-a12d-a785b1f9e8bc', 'wall.ree3@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace4', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.196', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.196', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('a0bd6d9f-53c4-46f5-8cf0-94ff18111887', 'wall.ree4@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace5', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.198', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.198', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('eb208efd-c330-405e-8c65-696107106905', 'wall.ree5@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace6', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.200', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.200', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('216ba198-5eff-4404-bf33-170d89267dda', 'wall.ree6@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace7', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.205', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:31:16.205', NULL, NULL) ON CONFLICT DO NOTHING;
      INSERT INTO ioasys.users
      (uuid, email, "password", first_name, last_name, created_by, created_date, updated_by, updated_date, deleted_by, deleted_date)
      VALUES('fae5e15e-79e4-4459-94f2-da4f83165af9', 'wall.ree@gmail.com', '$2b$10$1OnM./Detaat7mS3dZAz9O3XhaKdjf0Z8HnQ7f66yfS/MHTBJ7cxi', 'Wallace1', 'Reetz', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:30:19.600', '78774f63-3596-4d7f-badc-7e7a59169b0d', '2021-03-08 04:30:19.600', NULL, NULL) ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM ioasys.users
      WHERE uuid='a54a1a42-b86a-4208-814b-611017dbec03';
      DELETE FROM ioasys.users
      WHERE uuid='78524a2e-7c83-4ef1-9e3e-76fdf4b10f1c';
      DELETE FROM ioasys.users
      WHERE uuid='36d3258a-d131-42a6-a12d-a785b1f9e8bc';
      DELETE FROM ioasys.users
      WHERE uuid='a0bd6d9f-53c4-46f5-8cf0-94ff18111887';
      DELETE FROM ioasys.users
      WHERE uuid='eb208efd-c330-405e-8c65-696107106905';
      DELETE FROM ioasys.users
      WHERE uuid='216ba198-5eff-4404-bf33-170d89267dda';
      DELETE FROM ioasys.users
      WHERE uuid='fae5e15e-79e4-4459-94f2-da4f83165af9';    
    `);
    await queryRunner.query(`
      DELETE FROM ioasys.admins
      WHERE uuid='78774f63-3596-4d7f-badc-7e7a59169b0d';    
    `)
  }

}

//Copied generetad DDL from DBeaver version 7.0.4