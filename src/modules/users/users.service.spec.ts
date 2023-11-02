import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserGatewayInMemory } from './gateways/user-gateway-in-memory';
import { of } from 'rxjs';
// import { UserCreatedEvent } from './events/user-created.event';

describe('UsersService', () => {
  let service: UsersService;
  let userPersistenceGateway: UserGatewayInMemory;

  const eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(() => {
    userPersistenceGateway = new UserGatewayInMemory();
    service = new UsersService(userPersistenceGateway, eventEmitterMock as any);
  });

  it('deve criar um usuário', async () => {
    const user = await service.create({ name: 'my user' });
    expect(userPersistenceGateway.items).toEqual([user]);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'user.created',
      new UserCreatedEvent(user),
    );
  });
});
