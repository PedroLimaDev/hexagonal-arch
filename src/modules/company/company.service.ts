import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyGatewayInterface } from './gateways/company-gateway-interface';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyPersistenceGateway')
    private companyPersistenceGateway: CompanyGatewayInterface,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company(createCompanyDto.name);
    await this.companyPersistenceGateway.create(company);
    return company;
  }

  findAll() {
    return this.companyPersistenceGateway.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
