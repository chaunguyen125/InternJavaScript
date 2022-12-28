import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rolemapping} from './rolemapping.model';

@model()
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  note?: string;

  @hasMany(() => Rolemapping, {keyTo: 'role_id'})
  rolemappings: Rolemapping[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
