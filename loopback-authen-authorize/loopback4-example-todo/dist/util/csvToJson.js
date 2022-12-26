"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToJson = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const csvtojson_1 = tslib_1.__importDefault(require("csvtojson"));
async function csvToJson(templateDataPath, fileName) {
    const file = path_1.default.resolve(templateDataPath, fileName);
    // csv parse json
    const rows = await (0, csvtojson_1.default)().fromFile(file);
    return rows;
}
exports.csvToJson = csvToJson;
//# sourceMappingURL=csvToJson.js.map