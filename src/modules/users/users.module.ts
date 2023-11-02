import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModel } from './entities/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserGatewayTypeorm } from './gateways/user-gateway-typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserGatewayTypeorm,
    {
      provide: 'UserPersistenceGateway',
      useExisting: UserGatewayTypeorm,
    },
    {
      provide: 'UserIntegrationGateway',
      useExisting: UserGatewayTypeorm,
    },
  ],
})
export class UsersModule {}
