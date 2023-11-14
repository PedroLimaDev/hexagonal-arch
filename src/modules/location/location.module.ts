import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationModel } from './entities/location.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

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
