import { InjectRepository } from '@nestjs/typeorm';
import { UserGatewayInterface } from './user-gateway-interface';
import { UserModel } from '../entities/user.model';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

export class UserGatewayTypeorm implements UserGatewayInterface {
  constructor(
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = await this.userModel.save(user);
    user.id = newUser.id;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    const userModel = await this.userModel.findOne({ where: { id } });
    if (!userModel) {
      throw new Error('User not found');
    }
    return userModel;
  }
}
