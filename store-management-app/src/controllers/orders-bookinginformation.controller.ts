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
  Bookinginformation,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersBookinginformationController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/bookinginformation', {
    responses: {
      '200': {
        description: 'Orders has one Bookinginformation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bookinginformation),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bookinginformation>,
  ): Promise<Bookinginformation> {
    return this.ordersRepository.bookinginformation(id).get(filter);
  }

  @post('/orders/{id}/bookinginformation', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bookinginformation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookinginformation, {
            title: 'NewBookinginformationInOrders',
            exclude: ['id'],
            optional: ['order_id']
          }),
        },
      },
    }) bookinginformation: Omit<Bookinginformation, 'id'>,
  ): Promise<Bookinginformation> {
    return this.ordersRepository.bookinginformation(id).create(bookinginformation);
  }

  @patch('/orders/{id}/bookinginformation', {
    responses: {
      '200': {
        description: 'Orders.Bookinginformation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookinginformation, {partial: true}),
        },
      },
    })
    bookinginformation: Partial<Bookinginformation>,
    @param.query.object('where', getWhereSchemaFor(Bookinginformation)) where?: Where<Bookinginformation>,
  ): Promise<Count> {
    return this.ordersRepository.bookinginformation(id).patch(bookinginformation, where);
  }

  @del('/orders/{id}/bookinginformation', {
    responses: {
      '200': {
        description: 'Orders.Bookinginformation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bookinginformation)) where?: Where<Bookinginformation>,
  ): Promise<Count> {
    return this.ordersRepository.bookinginformation(id).delete(where);
  }
}
