import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Stores} from '../models';
import {StoresRepository} from '../repositories';

export class StoreController {
  constructor(
    @repository(StoresRepository)
    public storesRepository : StoresRepository,
  ) {}

  @post('/stores')
  @response(200, {
    description: 'Stores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stores, {
            title: 'NewStores',
            exclude: ['id'],
          }),
        },
      },
    })
    stores: Omit<Stores, 'id'>,
  ): Promise<Stores> {
    return this.storesRepository.create(stores);
  }

  @get('/stores/count')
  @response(200, {
    description: 'Stores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stores) where?: Where<Stores>,
  ): Promise<Count> {
    return this.storesRepository.count(where);
  }

  @get('/stores')
  @response(200, {
    description: 'Array of Stores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Stores) filter?: Filter<Stores>,
  ): Promise<Stores[]> {
    return this.storesRepository.find(filter);
  }

  @patch('/stores')
  @response(200, {
    description: 'Stores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stores, {partial: true}),
        },
      },
    })
    stores: Stores,
    @param.where(Stores) where?: Where<Stores>,
  ): Promise<Count> {
    return this.storesRepository.updateAll(stores, where);
  }

  @get('/stores/{id}')
  @response(200, {
    description: 'Stores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Stores, {exclude: 'where'}) filter?: FilterExcludingWhere<Stores>
  ): Promise<Stores> {
    return this.storesRepository.findById(id, filter);
  }

  @patch('/stores/{id}')
  @response(204, {
    description: 'Stores PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stores, {partial: true}),
        },
      },
    })
    stores: Stores,
  ): Promise<void> {
    await this.storesRepository.updateById(id, stores);
  }

  @put('/stores/{id}')
  @response(204, {
    description: 'Stores PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() stores: Stores,
  ): Promise<void> {
    await this.storesRepository.replaceById(id, stores);
  }

  @del('/stores/{id}')
  @response(204, {
    description: 'Stores DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.storesRepository.deleteById(id);
  }
}
