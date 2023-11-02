import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/data-source';
import { ConfigModule } from '@nestjs/config';
import { envsPath } from './modules/utils/env-path.util';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envsPath[process.env.NODE_ENV] || '.env',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
