import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity('location')
export class LocationModel extends BaseEntityModel {
  @Column()
  name: string;
}
