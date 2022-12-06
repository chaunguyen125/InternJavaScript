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
  Orders,
} from '../models';
import {ChargeRepository} from '../repositories';

export class ChargeOrdersController {
  constructor(
    @repository(ChargeRepository)
    public chargeRepository: ChargeRepository,
  ) { }

  @get('/charges/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to Charge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof Charge.prototype.id,
  ): Promise<Orders> {
    return this.chargeRepository.orders(id);
  }
}
