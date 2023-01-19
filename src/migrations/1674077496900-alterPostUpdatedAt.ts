import { MigrationInterface, QueryRunner } from "typeorm";

export class alterPostUpdatedAt1674077496900 implements MigrationInterface {
    name = 'alterPostUpdatedAt1674077496900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "updateAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "updatedAt" TO "updateAt"`);
    }

}
