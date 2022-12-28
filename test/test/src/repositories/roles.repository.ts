import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Roles, RolesRelations, Rolemapping} from '../models';
import {RolemappingRepository} from './rolemapping.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly rolemappings: HasManyRepositoryFactory<Rolemapping, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RolemappingRepository') protected rolemappingRepositoryGetter: Getter<RolemappingRepository>,
  ) {
    super(Roles, dataSource);
    this.rolemappings = this.createHasManyRepositoryFactoryFor('rolemappings', rolemappingRepositoryGetter,);
    this.registerInclusionResolver('rolemappings', this.rolemappings.inclusionResolver);
  }
}
