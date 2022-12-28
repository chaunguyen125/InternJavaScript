import {Entity, model, property} from '@loopback/repository';

@model()
export class Charge extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  product_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  order_id?: number;

  @property({
    type: 'number',
    default: 0,
  })
  quantity?: number;

  @property({
    type: 'number',
  })
  unit?: number;

  @property({
    type: 'number',
  })
  total?: number;


  constructor(data?: Partial<Charge>) {
    super(data);
  }
}

export interface ChargeRelations {
  // describe navigational properties here
}

export type ChargeWithRelations = Charge & ChargeRelations;
