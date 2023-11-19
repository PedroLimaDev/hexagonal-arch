import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { User } from '../entities/user.entity';
import { UserGatewayInterface } from './user-gateway-interface';

@Injectable()
export class UserGatewayHttp implements UserGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(user: User): Promise<User> {
    await lastValueFrom(
      this.httpService.post('users', {
        name: user.name,
      }),
    );
    return user;
  }

  async findAll(): Promise<User[]> {
    const { data } = await lastValueFrom(this.httpService.get<any[]>('users'));
    return data.map(
      (user) => new User(user.name, user.email, user.password, user.id),
    );
  }

  async findById(id: string): Promise<User> {
    const { data } = await lastValueFrom(
      this.httpService.get<any>(`users/${id}`),
    );
    return new User(data.name, data.email, data.password, data.id);
  }
}
