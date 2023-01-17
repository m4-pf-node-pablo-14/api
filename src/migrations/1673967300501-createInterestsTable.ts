import { MigrationInterface, QueryRunner } from "typeorm";

export class createInterestsTable1673967300501 implements MigrationInterface {
    name = 'createInterestsTable1673967300501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "PK_a2dc7b6f9a8bcf9e3f9312a879d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interests_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interestId" uuid, "postId" uuid, CONSTRAINT "PK_4d38e2ddaa62d40751bfe4ec6ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interest_one"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interest_two"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mainInterest" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "recentInterest" text`);
        await queryRunner.query(`ALTER TABLE "interests_post" ADD CONSTRAINT "FK_41f7408f5011b1ca5b18ed4667f" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interests_post" ADD CONSTRAINT "FK_352b78a0ed3543ca91aa6481fe4" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interests_post" DROP CONSTRAINT "FK_352b78a0ed3543ca91aa6481fe4"`);
        await queryRunner.query(`ALTER TABLE "interests_post" DROP CONSTRAINT "FK_41f7408f5011b1ca5b18ed4667f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recentInterest"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mainInterest"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interest_two" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interest_one" text`);
        await queryRunner.query(`DROP TABLE "interests_post"`);
        await queryRunner.query(`DROP TABLE "interests"`);
    }

}
