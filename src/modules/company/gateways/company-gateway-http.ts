import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { lastValueFrom } from 'rxjs';
import { CompanyGatewayInterface } from './company-gateway-interface';

@Injectable()
export class CompanyGatewayHttp implements CompanyGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(company: Company): Promise<Company> {
    await lastValueFrom(
      this.httpService.post('companies', {
        name: company.name,
      }),
    );
    return company;
  }

  async findAll(): Promise<Company[]> {
    const { data } = await lastValueFrom(
      this.httpService.get<any[]>('companies'),
    );
    return data.map((d) => new Company(d.name, d.id));
  }

  async findById(id: string): Promise<Company> {
    const { data } = await lastValueFrom(
      this.httpService.get<any>(`companies/${id}`),
    );
    return new Company(data.name, data.id);
  }
}
