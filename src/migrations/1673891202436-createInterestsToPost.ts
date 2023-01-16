import { MigrationInterface, QueryRunner } from "typeorm";

export class createInterestsToPost1673891202436 implements MigrationInterface {
    name = 'createInterestsToPost1673891202436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interests_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "interestId" uuid, "postId" uuid, CONSTRAINT "PK_4d38e2ddaa62d40751bfe4ec6ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "interests_post" ADD CONSTRAINT "FK_41f7408f5011b1ca5b18ed4667f" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interests_post" ADD CONSTRAINT "FK_352b78a0ed3543ca91aa6481fe4" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interests_post" DROP CONSTRAINT "FK_352b78a0ed3543ca91aa6481fe4"`);
        await queryRunner.query(`ALTER TABLE "interests_post" DROP CONSTRAINT "FK_41f7408f5011b1ca5b18ed4667f"`);
        await queryRunner.query(`DROP TABLE "interests_post"`);
    }

}
