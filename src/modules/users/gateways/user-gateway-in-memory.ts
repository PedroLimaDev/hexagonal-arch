import { User } from '../entities/user.entity';
import { UserGatewayInterface } from './user-gateway-interface';
import { v4 as uuidv4 } from 'uuid';

export class UserGatewayInMemory implements UserGatewayInterface {
  items: User[] = [];
  async create(user: User): Promise<User> {
    user.id = uuidv4();
    this.items.push(user);
    return user;
  }
  async findAll(): Promise<User[]> {
    return this.items;
  }
  async findById(id: string): Promise<User> {
    const user = this.items.find((item) => item.id === id);
    if (!user) {
      throw new Error('List not found');
    }
    return user;
  }
}
