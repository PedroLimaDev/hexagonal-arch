import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntityModel {
  @Column()
  name: string;
}
