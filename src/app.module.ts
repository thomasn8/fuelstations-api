import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsModule } from './stations/stations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmModuleOptions from './db/options';

@Module({
  imports: [StationsModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
