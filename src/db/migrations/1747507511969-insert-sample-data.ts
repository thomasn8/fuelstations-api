import { MigrationInterface, QueryRunner } from 'typeorm';
import seed from '../seed';
import { Station } from 'src/stations/entities/station.entity';
import clear from '../clear';

export class InsertSampleData1747507511969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await seed(queryRunner.manager.getRepository(Station), [
      {
        id: 'MIGROL_100000',
        name: 'Migrol Tankstelle',
        address: 'Scheffelstrasse 16',
        city: 'Zürich',
        latitude: 47.3943939,
        longitude: 8.52981,
        pumps: [
          {
            id: 1,
            fuel_type: 'BENZIN_95',
            price: 1.68,
            available: true,
          },
          {
            id: 2,
            fuel_type: 'BENZIN_98',
            price: 1.77,
            available: false,
          },
          {
            id: 3,
            fuel_type: 'DIESEL',
            price: 1.75,
            available: true,
          },
        ],
      },
      {
        id: 'MIGROL_100001',
        name: 'Migrol Service',
        address: 'Birmensdorferstrasse 517',
        city: 'Zürich',
        latitude: 47.367348257,
        longitude: 8.4942242729,
        pumps: [
          {
            id: 4,
            fuel_type: 'BENZIN_95',
            price: 1.72,
            available: true,
          },
          {
            id: 5,
            fuel_type: 'BENZIN_98',
            price: 1.79,
            available: true,
          },
          {
            id: 6,
            fuel_type: 'DIESEL',
            price: 1.71,
            available: false,
          },
        ],
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await clear(queryRunner.manager.getRepository(Station));
  }
}
