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
  Roles,
  Rolemapping,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesRolemappingController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Array of Roles has many Rolemapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rolemapping)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rolemapping>,
  ): Promise<Rolemapping[]> {
    return this.rolesRepository.rolemappings(id).find(filter);
  }

  @post('/roles/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rolemapping)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {
            title: 'NewRolemappingInRoles',
            exclude: ['id'],
            optional: ['role_id']
          }),
        },
      },
    }) rolemapping: Omit<Rolemapping, 'id'>,
  ): Promise<Rolemapping> {
    return this.rolesRepository.rolemappings(id).create(rolemapping);
  }

  @patch('/roles/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Roles.Rolemapping PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {partial: true}),
        },
      },
    })
    rolemapping: Partial<Rolemapping>,
    @param.query.object('where', getWhereSchemaFor(Rolemapping)) where?: Where<Rolemapping>,
  ): Promise<Count> {
    return this.rolesRepository.rolemappings(id).patch(rolemapping, where);
  }

  @del('/roles/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Roles.Rolemapping DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rolemapping)) where?: Where<Rolemapping>,
  ): Promise<Count> {
    return this.rolesRepository.rolemappings(id).delete(where);
  }
}
