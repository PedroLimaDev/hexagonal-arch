import { Company } from 'src/modules/company/entities/company.entity';

export class Location {
  id: string;
  name: string;
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  company: Company;

  constructor(
    name: string,
    cep: string,
    street: string,
    number: number,
    neighborhood: string,
    city: string,
    state: string,
    company?: Company,
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.cep = cep;
    this.street = street;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.company = company;
  }
}
