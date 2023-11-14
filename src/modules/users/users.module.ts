import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from './entities/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserGatewayTypeorm } from './gateways/user-gateway-typeorm';
import { UserGatewayHttp } from './gateways/user-gateway-http';
import { CreateUserInCrmListener } from './listeners/create-user-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserGatewayTypeorm,
    UserGatewayHttp,
    CreateUserInCrmListener,
    {
      provide: 'UserPersistenceGateway',
      useExisting: UserGatewayTypeorm,
    },
    {
      provide: 'UserIntegrationGateway',
      useExisting: UserGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class UsersModule {}
