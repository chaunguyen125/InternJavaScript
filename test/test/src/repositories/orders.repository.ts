import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Orders, OrdersRelations, Bookinginformation, Charge} from '../models';
import {BookinginformationRepository} from './bookinginformation.repository';
import {ChargeRepository} from './charge.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {

  public readonly bookinginformation: HasOneRepositoryFactory<Bookinginformation, typeof Orders.prototype.id>;

  public readonly charges: HasManyRepositoryFactory<Charge, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('BookinginformationRepository') protected bookinginformationRepositoryGetter: Getter<BookinginformationRepository>, @repository.getter('ChargeRepository') protected chargeRepositoryGetter: Getter<ChargeRepository>,
  ) {
    super(Orders, dataSource);
    this.charges = this.createHasManyRepositoryFactoryFor('charges', chargeRepositoryGetter,);
    this.registerInclusionResolver('charges', this.charges.inclusionResolver);
    this.bookinginformation = this.createHasOneRepositoryFactoryFor('bookinginformation', bookinginformationRepositoryGetter);
    this.registerInclusionResolver('bookinginformation', this.bookinginformation.inclusionResolver);
  }
}
