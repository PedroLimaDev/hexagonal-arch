import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/user-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class PublishUserCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    await this.queue.add('user.created', event);
  }
}
