import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Migrations, MigrationsRelations } from '../models';
export declare class MigrationsRepository extends DefaultCrudRepository<Migrations, typeof Migrations.prototype.id, MigrationsRelations> {
    constructor(dataSource: DbDataSource);
}
