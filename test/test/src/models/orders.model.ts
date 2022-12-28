import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Bookinginformation} from './bookinginformation.model';
import {Charge} from './charge.model';

@model()
export class Orders extends Entity {
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
  code?: string;

  @hasOne(() => Bookinginformation, {keyTo: 'order_id'})
  bookinginformation: Bookinginformation;

  @hasMany(() => Charge, {keyTo: 'order_id'})
  charges: Charge[];

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;
