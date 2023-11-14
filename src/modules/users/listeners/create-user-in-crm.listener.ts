import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserGatewayInterface } from '../gateways/user-gateway-interface';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateUserInCrmListener {
  constructor(
    @Inject('UserIntegrationGateway')
    private userIntegrationGateway: UserGatewayInterface,
  ) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    this.userIntegrationGateway.create(event.user);
  }
}
