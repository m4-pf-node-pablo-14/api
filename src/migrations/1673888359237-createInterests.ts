import { MigrationInterface, QueryRunner } from "typeorm";

export class createInterests1673888359237 implements MigrationInterface {
    name = 'createInterests1673888359237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "PK_a2dc7b6f9a8bcf9e3f9312a879d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "interests"`);
    }

}
