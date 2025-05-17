import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1747504156259 implements MigrationInterface {
  name = 'Init1747504156259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stations" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "address" varchar NOT NULL, "city" varchar NOT NULL, "latitude" float NOT NULL, "longitude" float NOT NULL, CONSTRAINT "UQ_998a2ff0191749951c74b9ba890" UNIQUE ("name"), CONSTRAINT "UQ_b915f3de53b85c63dca1763bc02" UNIQUE ("address"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pumps" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fuel_type" varchar NOT NULL, "price" float NOT NULL, "available" boolean NOT NULL, "stationId" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_pumps" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fuel_type" varchar NOT NULL, "price" float NOT NULL, "available" boolean NOT NULL, "stationId" varchar, CONSTRAINT "FK_d06cb958de1afb75834f1b34973" FOREIGN KEY ("stationId") REFERENCES "stations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pumps"("id", "fuel_type", "price", "available", "stationId") SELECT "id", "fuel_type", "price", "available", "stationId" FROM "pumps"`,
    );
    await queryRunner.query(`DROP TABLE "pumps"`);
    await queryRunner.query(`ALTER TABLE "temporary_pumps" RENAME TO "pumps"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pumps" RENAME TO "temporary_pumps"`);
    await queryRunner.query(
      `CREATE TABLE "pumps" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fuel_type" varchar NOT NULL, "price" float NOT NULL, "available" boolean NOT NULL, "stationId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "pumps"("id", "fuel_type", "price", "available", "stationId") SELECT "id", "fuel_type", "price", "available", "stationId" FROM "temporary_pumps"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pumps"`);
    await queryRunner.query(`DROP TABLE "pumps"`);
    await queryRunner.query(`DROP TABLE "stations"`);
  }
}
