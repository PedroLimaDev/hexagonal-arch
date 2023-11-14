import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity('company')
export class CompanyModel extends BaseEntityModel {
  @Column()
  name: string;
}
