import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RoleMapping,
  Users,
} from '../models';
import {RoleMappingRepository} from '../repositories';

export class RoleMappingUsersController {
  constructor(
    @repository(RoleMappingRepository)
    public roleMappingRepository: RoleMappingRepository,
  ) { }

  @get('/role-mappings/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to RoleMapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof RoleMapping.prototype.id,
  ): Promise<Users> {
    return this.roleMappingRepository.users(id);
  }
}
