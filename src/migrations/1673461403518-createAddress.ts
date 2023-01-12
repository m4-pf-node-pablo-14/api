import { MigrationInterface, QueryRunner } from "typeorm";

export class createAddress1673461403518 implements MigrationInterface {
    name = 'createAddress1673461403518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" text NOT NULL, "zipCode" text NOT NULL, "number" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressId"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
