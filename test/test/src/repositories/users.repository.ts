import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Users, UsersRelations, Rolemapping} from '../models';
import {RolemappingRepository} from './rolemapping.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly rolemappings: HasManyRepositoryFactory<Rolemapping, typeof Users.prototype.id>;
  findCredentials: any;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RolemappingRepository') protected rolemappingRepositoryGetter: Getter<RolemappingRepository>,
  ) {
    super(Users, dataSource);
    this.rolemappings = this.createHasManyRepositoryFactoryFor('rolemappings', rolemappingRepositoryGetter,);
    this.registerInclusionResolver('rolemappings', this.rolemappings.inclusionResolver);
  }
}
