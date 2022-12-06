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
  Roles,
} from '../models';
import {RoleMappingRepository} from '../repositories';

export class RoleMappingRolesController {
  constructor(
    @repository(RoleMappingRepository)
    public roleMappingRepository: RoleMappingRepository,
  ) { }

  @get('/role-mappings/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to RoleMapping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof RoleMapping.prototype.id,
  ): Promise<Roles> {
    return this.roleMappingRepository.roles(id);
  }
}
