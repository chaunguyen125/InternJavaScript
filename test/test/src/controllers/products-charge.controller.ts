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
  Products,
  Charge,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsChargeController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/charges', {
    responses: {
      '200': {
        description: 'Array of Products has many Charge',
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
    return this.productsRepository.charges(id).find(filter);
  }

  @post('/products/{id}/charges', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Charge)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charge, {
            title: 'NewChargeInProducts',
            exclude: ['id'],
            optional: ['product_id']
          }),
        },
      },
    }) charge: Omit<Charge, 'id'>,
  ): Promise<Charge> {
    return this.productsRepository.charges(id).create(charge);
  }

  @patch('/products/{id}/charges', {
    responses: {
      '200': {
        description: 'Products.Charge PATCH success count',
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
    return this.productsRepository.charges(id).patch(charge, where);
  }

  @del('/products/{id}/charges', {
    responses: {
      '200': {
        description: 'Products.Charge DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Charge)) where?: Where<Charge>,
  ): Promise<Count> {
    return this.productsRepository.charges(id).delete(where);
  }
}
