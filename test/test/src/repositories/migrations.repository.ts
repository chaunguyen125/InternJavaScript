import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Migrations, MigrationsRelations} from '../models';

export class MigrationsRepository extends DefaultCrudRepository<
  Migrations,
  typeof Migrations.prototype.id,
  MigrationsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Migrations, dataSource);
  }
}
