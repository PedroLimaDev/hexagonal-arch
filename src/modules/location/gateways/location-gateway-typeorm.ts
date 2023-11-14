import { InjectRepository } from '@nestjs/typeorm';
import { LocationGatewayInterface } from './location-gateway-interface';
import { LocationModel } from '../entities/location.model';
import { Location } from '../entities/location.entity';
import { Repository } from 'typeorm';

export class UserGatewayTypeorm implements LocationGatewayInterface {
  constructor(
    @InjectRepository(LocationModel)
    private locationModel: Repository<LocationModel>,
  ) {}

  async create(location: Location): Promise<Location> {
    const newLocation = await this.locationModel.save(location);
    location.id = newLocation.id;
    return location;
  }

  async findAll(): Promise<Location[]> {
    const locationsModels = await this.locationModel.find();
    return locationsModels.map(
      (locationModel) => new Location(locationModel.name, locationModel.id),
    );
  }

  async findById(id: string): Promise<Location> {
    const locationModel = await this.locationModel.findOne({ where: { id } });
    if (!locationModel) {
      throw new Error('Location not found');
    }
    return new Location(locationModel.name, locationModel.id);
  }
}
