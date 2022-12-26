"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Migrations = class Migrations extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Migrations.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Migrations.prototype, "name", void 0);
Migrations = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Migrations);
exports.Migrations = Migrations;
//# sourceMappingURL=migrations.model.js.map