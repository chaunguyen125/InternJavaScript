import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Bookinginformation, BookinginformationRelations} from '../models';

export class BookinginformationRepository extends DefaultCrudRepository<
  Bookinginformation,
  typeof Bookinginformation.prototype.id,
  BookinginformationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Bookinginformation, dataSource);
  }
}
