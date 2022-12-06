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
  RoleMapping,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesRoleMappingController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Array of Roles has many RoleMapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RoleMapping)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RoleMapping>,
  ): Promise<RoleMapping[]> {
    return this.rolesRepository.roleMappings(id).find(filter);
  }

  @post('/roles/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(RoleMapping)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoleMapping, {
            title: 'NewRoleMappingInRoles',
            exclude: ['id'],
            optional: ['rolesId']
          }),
        },
      },
    }) roleMapping: Omit<RoleMapping, 'id'>,
  ): Promise<RoleMapping> {
    return this.rolesRepository.roleMappings(id).create(roleMapping);
  }

  @patch('/roles/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Roles.RoleMapping PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoleMapping, {partial: true}),
        },
      },
    })
    roleMapping: Partial<RoleMapping>,
    @param.query.object('where', getWhereSchemaFor(RoleMapping)) where?: Where<RoleMapping>,
  ): Promise<Count> {
    return this.rolesRepository.roleMappings(id).patch(roleMapping, where);
  }

  @del('/roles/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Roles.RoleMapping DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RoleMapping)) where?: Where<RoleMapping>,
  ): Promise<Count> {
    return this.rolesRepository.roleMappings(id).delete(where);
  }
}
