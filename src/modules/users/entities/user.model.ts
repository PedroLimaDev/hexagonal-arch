import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserModel extends BaseEntityModel {
  @Column()
  name: string;
}
