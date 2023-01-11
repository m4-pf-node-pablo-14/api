import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPosts1673458354726 implements MigrationInterface {
    name = 'fixPosts1673458354726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "usersId" uuid`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "img" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "img" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "usersId"`);
    }

}
