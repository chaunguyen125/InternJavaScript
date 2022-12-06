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
  Stores,
  Products,
} from '../models';
import {StoresRepository} from '../repositories';

export class StoresProductsController {
  constructor(
    @repository(StoresRepository) protected storesRepository: StoresRepository,
  ) { }

  @get('/stores/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Stores has many Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.storesRepository.products(id).find(filter);
  }

  @post('/stores/{id}/products', {
    responses: {
      '200': {
        description: 'Stores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Stores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInStores',
            exclude: ['id'],
            optional: ['storesId']
          }),
        },
      },
    }) products: Omit<Products, 'id'>,
  ): Promise<Products> {
    return this.storesRepository.products(id).create(products);
  }

  @patch('/stores/{id}/products', {
    responses: {
      '200': {
        description: 'Stores.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.storesRepository.products(id).patch(products, where);
  }

  @del('/stores/{id}/products', {
    responses: {
      '200': {
        description: 'Stores.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.storesRepository.products(id).delete(where);
  }
}
