"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations = void 0;
const _010_create_admin_acc_1 = require("./010-create-admin-acc");
const repositories_1 = require("../repositories");
const console_1 = require("console");
const listMigration = [{ name: '010-create-admin-acc', migrateFunc: _010_create_admin_acc_1.createAdmin }];
async function migrations(app) {
    console.log("migrations func");
    const migrationRepository = await app.getRepository(repositories_1.MigrationsRepository);
    // const list = await migrationRepository.find()
    //console.log("LIST====>", list);
    for (const item of listMigration) {
        const found = await migrationRepository.findOne({ where: { name: item.name } });
        console.log("found line", found);
        if (found) {
            (0, console_1.log)("migration has been found");
        }
        else {
            const name = item.name;
            (0, console_1.log)("item name: ", name);
            await migrationRepository.create({ name });
            console.log("create migrations");
        }
        await item.migrateFunc(app);
        console.log("done");
    }
    // if(Object.keys(found).length <= 0) {
    // else {
    //     console.log("found"+JSON.stringify(found));
    //     console.log("migrate has been found");
    // }
    //   }
    //  listMigration.map(async (item) => {
    // })
}
exports.migrations = migrations;
//# sourceMappingURL=index.js.map