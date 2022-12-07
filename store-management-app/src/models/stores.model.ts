import {Entity, model, property, hasMany} from '@loopback/repository';
import {Products} from './products.model';

@model()
export class Stores extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => Products, {keyTo: 'id_store'})
  products: Products[];

  constructor(data?: Partial<Stores>) {
    super(data);
  }
}

export interface StoresRelations {
  // describe navigational properties here
}

export type StoresWithRelations = Stores & StoresRelations;
