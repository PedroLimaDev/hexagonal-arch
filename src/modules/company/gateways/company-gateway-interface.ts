import { Company } from '../entities/company.entity';

export interface CompanyGatewayInterface {
  create(company: Company): Promise<Company>;

  findAll(): Promise<Company[]>;

  findById(id: string): Promise<Company>;
}
