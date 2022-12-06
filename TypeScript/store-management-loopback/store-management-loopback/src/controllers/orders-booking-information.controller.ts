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
  BookingInformation,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersBookingInformationController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/booking-information', {
    responses: {
      '200': {
        description: 'Orders has one BookingInformation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BookingInformation),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BookingInformation>,
  ): Promise<BookingInformation> {
    return this.ordersRepository.bookingInformation(id).get(filter);
  }

  @post('/orders/{id}/booking-information', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(BookingInformation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookingInformation, {
            title: 'NewBookingInformationInOrders',
            exclude: ['id'],
            optional: ['ordersId']
          }),
        },
      },
    }) bookingInformation: Omit<BookingInformation, 'id'>,
  ): Promise<BookingInformation> {
    return this.ordersRepository.bookingInformation(id).create(bookingInformation);
  }

  @patch('/orders/{id}/booking-information', {
    responses: {
      '200': {
        description: 'Orders.BookingInformation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookingInformation, {partial: true}),
        },
      },
    })
    bookingInformation: Partial<BookingInformation>,
    @param.query.object('where', getWhereSchemaFor(BookingInformation)) where?: Where<BookingInformation>,
  ): Promise<Count> {
    return this.ordersRepository.bookingInformation(id).patch(bookingInformation, where);
  }

  @del('/orders/{id}/booking-information', {
    responses: {
      '200': {
        description: 'Orders.BookingInformation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BookingInformation)) where?: Where<BookingInformation>,
  ): Promise<Count> {
    return this.ordersRepository.bookingInformation(id).delete(where);
  }
}
