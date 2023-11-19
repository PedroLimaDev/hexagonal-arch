import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import BaseEntityModel from '../../utils/entity-base/base-entity.entity';
import { CompanyModel } from '../../company/entities/company.model';

@Entity('location')
export class LocationModel extends BaseEntityModel {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  cep: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ManyToOne((type) => CompanyModel, { onDelete: 'CASCADE' })
  company: CompanyModel;
}
