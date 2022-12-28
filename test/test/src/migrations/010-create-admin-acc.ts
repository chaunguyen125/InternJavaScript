
import { UsersRepository, RolemappingRepository} from "../repositories";
import { genSalt, hash } from 'bcryptjs';
import _, { find } from 'lodash';
import { TestApplication } from "../application";
import { repository } from "@loopback/repository";
import { log } from "console";
import path from 'path'
import csv from 'csvtojson'
import { csvToJson } from "../util/csvToJson";

export const templateDataPath = path.join(__dirname, '../../data/')

export async function createAdmin(app: TestApplication) {
    console.log("create adminnnnn");
    try {
        const userRepository = await app.getRepository(UsersRepository);
        const rolemappingRepository = await app.getRepository(RolemappingRepository);
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

            const found = await userRepository.findOne({ where: { user_name: newUserRequest.user_name } });
            if (found) {
                console.log("admin is exist");
    
            }
            else {
                console.log("admin is not exist");
    
                const password = await hash(newUserRequest.password, await genSalt());
                const savedUser = await userRepository.create(
                    _.omit(newUserRequest, 'roles'),
                );
                const newAdmin = await userRepository.findOne({where: {user_name: newUserRequest.user_name}});

                if(newAdmin) await rolemappingRepository.create({user_id: newAdmin.id,
                                                    role_id: 1});
    
                console.log("log" + password, newUserRequest);
    
                // await userRepository.rolemappings(savedUser.id).create({ role_id });
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
