import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUsersInterest1673893094833 implements MigrationInterface {
    name = 'alterUsersInterest1673893094833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interest_one"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interest_two"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mainInterest" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "recentInterest" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recentInterest"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mainInterest"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interest_two" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interest_one" text`);
    }

}
