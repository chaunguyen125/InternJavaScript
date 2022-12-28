import {Entity, model, property, hasMany} from '@loopback/repository';
import {Products} from './products.model';

@model()
export class Category extends Entity {
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
  name?: string;

  @hasMany(() => Products, {keyTo: 'id_category'})
  products: Products[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
