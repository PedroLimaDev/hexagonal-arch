import { User } from 'src/modules/users/entities/user.entity';
import { Location } from 'src/modules/location/entities/location.entity';

export class Company {
  id: string;
  name: string;
  website: string;
  cnpj: string;
  user: User;
  locations: Location[];

  constructor(
    name: string,
    website: string,
    cnpj: string,
    id?: string,
    user?: User,
    locations?: Location[],
  ) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.cnpj = cnpj;
    this.user = user;
    this.locations = locations;
  }
}
