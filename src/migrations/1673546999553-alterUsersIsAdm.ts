import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUsersIsAdm1673546999553 implements MigrationInterface {
    name = 'alterUsersIsAdm1673546999553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
    }

}
