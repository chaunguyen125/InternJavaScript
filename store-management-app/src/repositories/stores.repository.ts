import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Stores, StoresRelations, Products} from '../models';
import {ProductsRepository} from './products.repository';

export class StoresRepository extends DefaultCrudRepository<
  Stores,
  typeof Stores.prototype.id,
  StoresRelations
> {

  public readonly products: HasManyRepositoryFactory<Products, typeof Stores.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,
  ) {
    super(Stores, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
