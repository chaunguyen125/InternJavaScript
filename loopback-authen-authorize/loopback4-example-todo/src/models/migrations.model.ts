import {Entity, model, property} from '@loopback/repository';

@model()
export class Migrations extends Entity {
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


  constructor(data?: Partial<Migrations>) {
    super(data);
  }
}

export interface MigrationsRelations {
  // describe navigational properties here
}

export type MigrationsWithRelations = Migrations & MigrationsRelations;
