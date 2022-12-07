import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Products, ProductsRelations, Stores, Charge} from '../models';
import {StoresRepository} from './stores.repository';
import {ChargeRepository} from './charge.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly stores: BelongsToAccessor<Stores, typeof Products.prototype.id>;

  public readonly charges: HasManyRepositoryFactory<Charge, typeof Products.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StoresRepository') protected storesRepositoryGetter: Getter<StoresRepository>, @repository.getter('ChargeRepository') protected chargeRepositoryGetter: Getter<ChargeRepository>,
  ) {
    super(Products, dataSource);
    this.charges = this.createHasManyRepositoryFactoryFor('charges', chargeRepositoryGetter,);
    this.registerInclusionResolver('charges', this.charges.inclusionResolver);
    this.stores = this.createBelongsToAccessorFor('stores', storesRepositoryGetter,);
    this.registerInclusionResolver('stores', this.stores.inclusionResolver);
  }
}
