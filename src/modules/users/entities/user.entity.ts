import { Company } from 'src/modules/company/entities/company.entity';
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  companies: Company[];

  constructor(
    name: string,
    email: string,
    password: string,
    companies?: Company[],
    id?: string,
  ) {
    this.id = id || null;
    this.name = name;
    this.email = email;
    this.password = password;
    this.companies = companies;
  }
}
