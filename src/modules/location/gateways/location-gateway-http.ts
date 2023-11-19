import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Location } from '../entities/location.entity';
import { lastValueFrom } from 'rxjs';
import { LocationGatewayInterface } from './location-gateway-interface';

@Injectable()
export class LocationGatewayHttp implements LocationGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(location: Location): Promise<Location> {
    await lastValueFrom(
      this.httpService.post('locations', {
        name: location.name,
      }),
    );
    return location;
  }

  async findAll(): Promise<Location[]> {
    const { data } = await lastValueFrom(
      this.httpService.get<any[]>('locations'),
    );
    return data.map(
      (d) =>
        new Location(
          d.name,
          d.cep,
          d.street,
          d.number,
          d.neighborhood,
          d.city,
          d.state,
          d.id,
        ),
    );
  }

  async findById(id: string): Promise<Location> {
    const { data } = await lastValueFrom(
      this.httpService.get<any>(`locations/${id}`),
    );
    return new Location(
      data.name,
      data.cep,
      data.street,
      data.number,
      data.neighborhood,
      data.city,
      data.state,
      data.id,
    );
  }
}
