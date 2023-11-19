import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { LocationModel } from '../../location/entities/location.model';
import { UserModel } from '../../users/entities/user.model';

@Entity('company')
export class CompanyModel extends BaseEntityModel {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  website: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ManyToOne((type) => UserModel, { onDelete: 'CASCADE' })
  user: UserModel;

  @OneToMany((type) => LocationModel, (location) => location.company)
  locations: LocationModel[];
}
