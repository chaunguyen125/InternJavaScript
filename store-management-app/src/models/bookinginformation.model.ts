import {Entity, model, property} from '@loopback/repository';

@model()
export class Bookinginformation extends Entity {
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
  order_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  full_name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  address?: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number?: string;


  constructor(data?: Partial<Bookinginformation>) {
    super(data);
  }
}

export interface BookinginformationRelations {
  // describe navigational properties here
}

export type BookinginformationWithRelations = Bookinginformation & BookinginformationRelations;
