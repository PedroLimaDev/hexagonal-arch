import { Location } from '../entities/location.entity';
import { LocationGatewayInterface } from './location-gateway-interface';
import { v4 as uuidv4 } from 'uuid';

export class UserGatewayInMemory implements LocationGatewayInterface {
  items: Location[] = [];
  async create(location: Location): Promise<Location> {
    location.id = uuidv4();
    this.items.push(location);
    return location;
  }
  async findAll(): Promise<Location[]> {
    return this.items;
  }
  async findById(id: string): Promise<Location> {
    const location = this.items.find((item) => item.id === id);
    if (!location) {
      throw new Error('Location not found');
    }
    return location;
  }
}
