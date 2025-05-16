import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Pump } from '../stations/entities/pump.entity';
// import { Station } from '../stations/entities/station.entity';

// TODO
const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  // database: './local-database.sqlite3',

  // autoLoadEntities: false,
  // entities: [Station, Pump],
  // synchronize: false,
  // migrationsRun: true,
  // migrations: [],

  // autoLoadEntities: true,
  // synchronize: true,
  // migrationsRun: false,

  database: ':memory:',
  autoLoadEntities: true,
  synchronize: true,
  retryAttempts: 0,
  dropSchema: true,
};

export default typeOrmModuleOptions;
