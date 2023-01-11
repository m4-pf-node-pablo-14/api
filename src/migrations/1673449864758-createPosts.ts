import { MigrationInterface, QueryRunner } from "typeorm";

export class createPosts1673449864758 implements MigrationInterface {
    name = 'createPosts1673449864758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img" text, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_users_users" ("postsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0f373e785d2a0032014f4b5127a" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc17d6a0d3e6969076195a0ac6" ON "posts_users_users" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a719cd3ead249ea1f288b7e3aa" ON "posts_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "posts_users_users" ADD CONSTRAINT "FK_dc17d6a0d3e6969076195a0ac63" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_users_users" ADD CONSTRAINT "FK_a719cd3ead249ea1f288b7e3aa5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_users_users" DROP CONSTRAINT "FK_a719cd3ead249ea1f288b7e3aa5"`);
        await queryRunner.query(`ALTER TABLE "posts_users_users" DROP CONSTRAINT "FK_dc17d6a0d3e6969076195a0ac63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a719cd3ead249ea1f288b7e3aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc17d6a0d3e6969076195a0ac6"`);
        await queryRunner.query(`DROP TABLE "posts_users_users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
