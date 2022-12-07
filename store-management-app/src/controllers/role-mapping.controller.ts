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
import {Rolemapping} from '../models';
import {RolemappingRepository} from '../repositories';

export class RoleMappingController {
  constructor(
    @repository(RolemappingRepository)
    public rolemappingRepository : RolemappingRepository,
  ) {}

  @post('/rolemappings')
  @response(200, {
    description: 'Rolemapping model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rolemapping)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {
            title: 'NewRolemapping',
            exclude: ['id'],
          }),
        },
      },
    })
    rolemapping: Omit<Rolemapping, 'id'>,
  ): Promise<Rolemapping> {
    return this.rolemappingRepository.create(rolemapping);
  }

  @get('/rolemappings/count')
  @response(200, {
    description: 'Rolemapping model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rolemapping) where?: Where<Rolemapping>,
  ): Promise<Count> {
    return this.rolemappingRepository.count(where);
  }

  @get('/rolemappings')
  @response(200, {
    description: 'Array of Rolemapping model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rolemapping, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rolemapping) filter?: Filter<Rolemapping>,
  ): Promise<Rolemapping[]> {
    return this.rolemappingRepository.find(filter);
  }

  @patch('/rolemappings')
  @response(200, {
    description: 'Rolemapping PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {partial: true}),
        },
      },
    })
    rolemapping: Rolemapping,
    @param.where(Rolemapping) where?: Where<Rolemapping>,
  ): Promise<Count> {
    return this.rolemappingRepository.updateAll(rolemapping, where);
  }

  @get('/rolemappings/{id}')
  @response(200, {
    description: 'Rolemapping model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rolemapping, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rolemapping, {exclude: 'where'}) filter?: FilterExcludingWhere<Rolemapping>
  ): Promise<Rolemapping> {
    return this.rolemappingRepository.findById(id, filter);
  }

  @patch('/rolemappings/{id}')
  @response(204, {
    description: 'Rolemapping PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {partial: true}),
        },
      },
    })
    rolemapping: Rolemapping,
  ): Promise<void> {
    await this.rolemappingRepository.updateById(id, rolemapping);
  }

  @put('/rolemappings/{id}')
  @response(204, {
    description: 'Rolemapping PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rolemapping: Rolemapping,
  ): Promise<void> {
    await this.rolemappingRepository.replaceById(id, rolemapping);
  }

  @del('/rolemappings/{id}')
  @response(204, {
    description: 'Rolemapping DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolemappingRepository.deleteById(id);
  }
}
