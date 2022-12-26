import { Entity } from '@loopback/repository';
export declare class Migrations extends Entity {
    id?: number;
    name: string;
    constructor(data?: Partial<Migrations>);
}
export interface MigrationsRelations {
}
export type MigrationsWithRelations = Migrations & MigrationsRelations;
