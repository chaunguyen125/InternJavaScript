import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Orders,
  Charge,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersChargeController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/charges', {
    responses: {
      '200': {
        description: 'Array of Orders has many Charge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Charge)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Charge>,
  ): Promise<Charge[]> {
    return this.ordersRepository.charges(id).find(filter);
  }

  @post('/orders/{id}/charges', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Charge)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {
            title: 'NewChargeInOrders',
            exclude: ['id'],
            optional: ['order_id']
          }),
        },
      },
    }) charge: Omit<Charge, 'id'>,
  ): Promise<Charge> {
    return this.ordersRepository.charges(id).create(charge);
  }

  @patch('/orders/{id}/charges', {
    responses: {
      '200': {
        description: 'Orders.Charge PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {partial: true}),
        },
      },
    })
    charge: Partial<Charge>,
    @param.query.object('where', getWhereSchemaFor(Charge)) where?: Where<Charge>,
  ): Promise<Count> {
    return this.ordersRepository.charges(id).patch(charge, where);
  }

  @del('/orders/{id}/charges', {
    responses: {
      '200': {
        description: 'Orders.Charge DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Charge)) where?: Where<Charge>,
  ): Promise<Count> {
    return this.ordersRepository.charges(id).delete(where);
  }
}
