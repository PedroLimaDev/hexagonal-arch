import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/data-source';
import { ConfigModule } from '@nestjs/config';
import { envsPath } from './modules/utils/env-path.util';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CompanyModule } from './modules/company/company.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envsPath[process.env.NODE_ENV] || '.env',
    }),
    UsersModule,
    CompanyModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
