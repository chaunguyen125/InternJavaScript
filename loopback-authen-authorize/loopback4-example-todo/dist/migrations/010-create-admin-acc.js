"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.templateDataPath = void 0;
const tslib_1 = require("tslib");
const repositories_1 = require("../repositories");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const console_1 = require("console");
const path_1 = tslib_1.__importDefault(require("path"));
const csvToJson_1 = require("../util/csvToJson");
exports.templateDataPath = path_1.default.join(__dirname, '../../data/');
async function createAdmin(app) {
    console.log("create adminnnnn");
    try {
        const userRepository = await app.getRepository(repositories_1.UserRepository);
        // read file by [path]
        const fileName = 'data.csv';
        // const file = path.resolve(templateDataPath, fileName)
        // // csv parse json
        // const rows =await csv().fromFile(file);
        const rows = await (0, csvToJson_1.csvToJson)(exports.templateDataPath, fileName);
        (0, console_1.log)("rows:", rows);
        console.log("hereeeee");
        for (const newUserRequest of rows) {
            // console.log("user request: ", newUserRequest);
            const found = await userRepository.findOne({ where: { email: newUserRequest.email } });
            if (found) {
                console.log("admin is exist");
            }
            else {
                console.log("admin is not exist");
                const password = await (0, bcryptjs_1.hash)(newUserRequest.password, await (0, bcryptjs_1.genSalt)());
                const savedUser = await userRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
                console.log("log" + password, newUserRequest);
                await userRepository.userCredentials(savedUser.id).create({ password });
            }
        }
        // const newUserRequest = {
        //     password: "systemsadmin",
        //     email: "admin@gmail.com"
        // }
    }
    catch (error) {
        (0, console_1.log)("error for userGetrepo: " + error);
    }
}
exports.createAdmin = createAdmin;
//# sourceMappingURL=010-create-admin-acc.js.map