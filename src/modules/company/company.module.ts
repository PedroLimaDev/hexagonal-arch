import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyModel } from './entities/company.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CompanyGatewayTypeorm } from './gateways/company-gateway-typeorm';
import { CompanyGatewayHttp } from './gateways/company-gateway-http';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyGatewayTypeorm,
    CompanyGatewayHttp,
    {
      provide: 'CompanyPersistenceGateway',
      useExisting: CompanyGatewayTypeorm,
    },
    {
      provide: 'CompanyIntegrationGateway',
      useExisting: CompanyGatewayHttp,
    },
  ],
})
export class CompanyModule {}
