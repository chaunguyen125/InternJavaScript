import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rolemapping} from './rolemapping.model';

@model()
export class Users extends Entity {
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
  user_name: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
  })
  date_of_birth?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @hasMany(() => Rolemapping, {keyTo: 'user_id'})
  rolemappings: Rolemapping[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
