import {Entity, model, property} from '@loopback/repository';

@model()
export class Rolemapping extends Entity {
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
  role_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id?: number;


  constructor(data?: Partial<Rolemapping>) {
    super(data);
  }
}

export interface RolemappingRelations {
  // describe navigational properties here
}

export type RolemappingWithRelations = Rolemapping & RolemappingRelations;
