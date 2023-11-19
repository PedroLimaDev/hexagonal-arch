import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { LocationModel } from '../entities/location.model';
import { Location } from '../entities/location.entity';
import { LocationGatewayInterface } from './location-gateway-interface';

export class LocationGatewayTypeorm implements LocationGatewayInterface {
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
    return await this.locationModel.find();
  }

  async findById(id: string): Promise<Location> {
    const locationModel = await this.locationModel.findOne({ where: { id } });

    if (!locationModel) {
      throw new Error('Location not found');
    }

    return locationModel;
  }
}
