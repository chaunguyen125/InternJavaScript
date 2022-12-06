import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BookingInformation,
  Orders,
} from '../models';
import {BookingInformationRepository} from '../repositories';

export class BookingInformationOrdersController {
  constructor(
    @repository(BookingInformationRepository)
    public bookingInformationRepository: BookingInformationRepository,
  ) { }

  @get('/booking-informations/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to BookingInformation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof BookingInformation.prototype.id,
  ): Promise<Orders> {
    return this.bookingInformationRepository.orders(id);
  }
}
