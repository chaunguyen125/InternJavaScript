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
  Rolemapping,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersRolemappingController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Array of Users has many Rolemapping',
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
    return this.usersRepository.rolemappings(id).find(filter);
  }

  @post('/users/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rolemapping)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolemapping, {
            title: 'NewRolemappingInUsers',
            exclude: ['id'],
            optional: ['user_id']
          }),
        },
      },
    }) rolemapping: Omit<Rolemapping, 'id'>,
  ): Promise<Rolemapping> {
    return this.usersRepository.rolemappings(id).create(rolemapping);
  }

  @patch('/users/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Users.Rolemapping PATCH success count',
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
    return this.usersRepository.rolemappings(id).patch(rolemapping, where);
  }

  @del('/users/{id}/rolemappings', {
    responses: {
      '200': {
        description: 'Users.Rolemapping DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rolemapping)) where?: Where<Rolemapping>,
  ): Promise<Count> {
    return this.usersRepository.rolemappings(id).delete(where);
  }
}
