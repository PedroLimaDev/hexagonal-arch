import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { LocationModel } from './entities/location.model';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

import { LocationGatewayTypeorm } from './gateways/location-gateway-typeorm';
import { LocationGatewayHttp } from './gateways/location-gateway-http';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [LocationController],
  providers: [
    LocationService,
    LocationGatewayTypeorm,
    LocationGatewayHttp,
    {
      provide: 'LocationPersistenceGateway',
      useExisting: LocationGatewayTypeorm,
    },
    {
      provide: 'LocationIntegrationGateway',
      useExisting: LocationGatewayHttp,
    },
  ],
})
export class LocationModule {}
