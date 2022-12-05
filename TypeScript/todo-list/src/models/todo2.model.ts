import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Todo2 extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Todo2>) {
    super(data);
  }
}

export interface Todo2Relations {
  // describe navigational properties here
}

export type Todo2WithRelations = Todo2 & Todo2Relations;
