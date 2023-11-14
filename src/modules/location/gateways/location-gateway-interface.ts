import { Location } from '../entities/location.entity';

export interface LocationGatewayInterface {
  create(location: Location): Promise<Location>;

  findAll(): Promise<Location[]>;

  findById(id: string): Promise<Location>;
}
