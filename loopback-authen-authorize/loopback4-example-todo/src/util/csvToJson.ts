import path from 'path'
import csv from 'csvtojson'

export async function csvToJson(templateDataPath: string,fileName: any) {
    const file = path.resolve(templateDataPath, fileName)
        // csv parse json
    const rows =await csv().fromFile(file);
    return rows;

}