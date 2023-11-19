import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { CompanyModel } from '../../company/entities/company.model';

@Entity('users')
export class UserModel extends BaseEntityModel {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @OneToMany((type) => CompanyModel, (company) => company)
  companies: CompanyModel[];
}
