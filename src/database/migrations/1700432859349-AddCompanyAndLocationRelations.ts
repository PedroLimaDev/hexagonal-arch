import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyAndLocationRelations1700432859349 implements MigrationInterface {
    name = 'AddCompanyAndLocationRelations1700432859349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "cep" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "street" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "number" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "neighborhood" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "city" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "state" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD "companyId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "company"
            ADD "website" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "company"
            ADD "cnpj" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "company"
            ADD "userId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "location"
            ADD CONSTRAINT "FK_f267b47598f6f0f69feaafaeaae" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "company"
            ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP CONSTRAINT "FK_f267b47598f6f0f69feaafaeaae"
        `);
        await queryRunner.query(`
            ALTER TABLE "company" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "company" DROP COLUMN "cnpj"
        `);
        await queryRunner.query(`
            ALTER TABLE "company" DROP COLUMN "website"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "companyId"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "state"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "city"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "neighborhood"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "number"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "street"
        `);
        await queryRunner.query(`
            ALTER TABLE "location" DROP COLUMN "cep"
        `);
    }

}
