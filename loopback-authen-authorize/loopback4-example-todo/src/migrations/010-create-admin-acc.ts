
import { UserRepository } from "../repositories";
import { genSalt, hash } from 'bcryptjs';
import _, { find } from 'lodash';
import { TodoListApplication } from "../application";
import { repository } from "@loopback/repository";
import { log } from "console";
import path from 'path'
import csv from 'csvtojson'
import { csvToJson } from "../util/csvToJson";

export const templateDataPath = path.join(__dirname, '../../data/')

export async function createAdmin(app: TodoListApplication) {
    console.log("create adminnnnn");
    try {
        const userRepository = await app.getRepository(UserRepository);
        // read file by [path]
        const fileName = 'data.csv'
        // const file = path.resolve(templateDataPath, fileName)
        // // csv parse json
        // const rows =await csv().fromFile(file);
        const rows = await csvToJson(templateDataPath, fileName);
        log("rows:", rows)
        console.log("hereeeee");
        for (const newUserRequest of rows) {

            // console.log("user request: ", newUserRequest);

            const found = await userRepository.findOne({ where: { email: newUserRequest.email } });
            if (found) {
                console.log("admin is exist");
    
            }
            else {
                console.log("admin is not exist");
    
                const password = await hash(newUserRequest.password, await genSalt());
                const savedUser = await userRepository.create(
                    _.omit(newUserRequest, 'password'),
                );
    
                console.log("log" + password, newUserRequest);
    
                await userRepository.userCredentials(savedUser.id).create({ password });
            }
        }
        // const newUserRequest = {
        //     password: "systemsadmin",
        //     email: "admin@gmail.com"
        // }

    } catch (error) {
        log("error for userGetrepo: " + error);
    }
}
