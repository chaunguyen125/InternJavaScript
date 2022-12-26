import { createAdmin } from "./010-create-admin-acc";
import { TodoListApplication } from "../application";
import { MigrationsRepository, UserRepository } from "../repositories";
import { forEach } from "lodash";
import _, { find } from 'lodash';
import { log } from "console";


const listMigration = [{name: '010-create-admin-acc', migrateFunc: createAdmin}];


export async function migrations(app:TodoListApplication) {
    console.log("migrations func");
    
    const migrationRepository = await app.getRepository(MigrationsRepository);
    // const list = await migrationRepository.find()
    //console.log("LIST====>", list);
    for (const item of listMigration) {
        
        const found = await migrationRepository.findOne({where: {name: item.name}});
        console.log("found line", found);
        if(found) {
            log("migration has been found");
        }
        else {
            const name = item.name;
            log("item name: ", name);
            await migrationRepository.create({name}
                );
                
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
