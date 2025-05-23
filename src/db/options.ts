import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Pump } from '../stations/entities/pump.entity';
import { Station } from '../stations/entities/station.entity';
import { Init1747504156259 } from './migrations/1747504156259-init';
import { InsertSampleData1747507511969 } from './migrations/1747507511969-insert-sample-data';

const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'sqlite',

  // PROD
  database: './src/db/database.sqlite3',
  autoLoadEntities: false,
  entities: [Station, Pump],
  synchronize: false,
  migrationsRun: true,
  migrations: [Init1747504156259, InsertSampleData1747507511969],

  // DEV
  // database: ':memory:',
  // autoLoadEntities: true,
  // synchronize: true,
  // migrationsRun: false,
  // retryAttempts: 0,
  // dropSchema: true,
};

export default typeOrmModuleOptions;
