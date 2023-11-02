import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserGatewayInterface } from './gateways/user-gateway-interface';
import { User } from './entities/user.entity';
import EventEmitter from 'events';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserPersistenceGateway')
    private userPersistenceGateway: UserGatewayInterface,
    @Inject('UserIntegrationGateway')
    private userIntegrationGateway: UserGatewayInterface,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.name);
    await this.userPersistenceGateway.create(user);
    await this.userIntegrationGateway.create(user);
    return user;
  }

  async findAll() {
    return this.userPersistenceGateway.findAll();
  }

  async findById(id: string) {
    const user = this.userPersistenceGateway.findById(id);

    if (!user) throw new Error('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
