import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Stores} from './stores.model';
import {Charge} from './charge.model';

@model()
export class Products extends Entity {
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
    type: 'number',
  })
  quantity?: number;
  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'number',
    required: true,
  })
  id_category?: number;

  @belongsTo(() => Stores, {name: 'stores'})
  id_store: number;

  @hasMany(() => Charge, {keyTo: 'product_id'})
  charges: Charge[];

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
