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
  Users,
  RoleMapping,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersRoleMappingController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Array of Users has many RoleMapping',
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
    return this.usersRepository.roleMappings(id).find(filter);
  }

  @post('/users/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(RoleMapping)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoleMapping, {
            title: 'NewRoleMappingInUsers',
            exclude: ['id'],
            optional: ['usersId']
          }),
        },
      },
    }) roleMapping: Omit<RoleMapping, 'id'>,
  ): Promise<RoleMapping> {
    return this.usersRepository.roleMappings(id).create(roleMapping);
  }

  @patch('/users/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Users.RoleMapping PATCH success count',
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
    return this.usersRepository.roleMappings(id).patch(roleMapping, where);
  }

  @del('/users/{id}/role-mappings', {
    responses: {
      '200': {
        description: 'Users.RoleMapping DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RoleMapping)) where?: Where<RoleMapping>,
  ): Promise<Count> {
    return this.usersRepository.roleMappings(id).delete(where);
  }
}
