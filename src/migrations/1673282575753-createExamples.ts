import { MigrationInterface, QueryRunner } from "typeorm";

export class createExamples1673282575753 implements MigrationInterface {
    name = 'createExamples1673282575753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "examples" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_ea56499b0a3a29593d3405080e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "examples"`);
    }

}
