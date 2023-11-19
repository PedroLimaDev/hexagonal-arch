import { InjectRepository } from '@nestjs/typeorm';
import { CompanyGatewayInterface } from './company-gateway-interface';
import { CompanyModel } from '../entities/company.model';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';

export class CompanyGatewayTypeorm implements CompanyGatewayInterface {
  constructor(
    @InjectRepository(CompanyModel)
    private companyModel: Repository<CompanyModel>,
  ) {}

  async create(company: Company): Promise<Company> {
    const newCompany = await this.companyModel.save(company);
    company.id = newCompany.id;
    return company;
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find();
  }

  async findById(id: string): Promise<Company> {
    const companyModel = await this.companyModel.findOne({ where: { id } });
    if (!companyModel) {
      throw new Error('Company not found');
    }
    return companyModel;
  }
}
