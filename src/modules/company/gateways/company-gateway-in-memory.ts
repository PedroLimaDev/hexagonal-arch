import { Company } from '../entities/company.entity';
import { CompanyGatewayInterface } from './company-gateway-interface';
import { v4 as uuidv4 } from 'uuid';

export class CompanyGatewayInMemory implements CompanyGatewayInterface {
  items: Company[] = [];
  async create(company: Company): Promise<Company> {
    company.id = uuidv4();
    this.items.push(company);
    return company;
  }
  async findAll(): Promise<Company[]> {
    return this.items;
  }
  async findById(id: string): Promise<Company> {
    const company = this.items.find((item) => item.id === id);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }
}
