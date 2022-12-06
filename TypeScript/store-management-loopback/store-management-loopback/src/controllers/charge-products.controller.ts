import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Charge,
  Products,
} from '../models';
import {ChargeRepository} from '../repositories';

export class ChargeProductsController {
  constructor(
    @repository(ChargeRepository)
    public chargeRepository: ChargeRepository,
  ) { }

  @get('/charges/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to Charge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.number('id') id: typeof Charge.prototype.id,
  ): Promise<Products> {
    return this.chargeRepository.products(id);
  }
}
