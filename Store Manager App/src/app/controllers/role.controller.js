const { log } = require('console');
const db = require ('../../config/postgres.config');


class RoleController {
    async rolePermission (req, res) {
        let {user_name, role_name} = req.body;
        console.log(user_name, role_name);
        let user_id = await db.query('select id from users where user_name = $1', [user_name]);
        console.log("userid: " + JSON.stringify(user_id));
        let role_id = await db.query('select id from roles where role_name = $1', [role_name]);
        console.log("roleid: " + JSON.stringify(role_id));
        let checkUser = await db.query('select id from role_mapping where user_id = $1', [user_id[0]["id"]]);
        console.log("checkUser: " + JSON.stringify(checkUser));
        if (checkUser && checkUser.length > 0) {
            db.query(`UPDATE role_mapping SET role_id = $1 where id = $2`,[role_id[0]["id"],checkUser[0]["id"]]);
            res.json('update role success')
        }
        else
         if(checkUser && checkUser.length == 0) {
            db.query('INSERT INTO role_mapping (user_id, role_id) VALUES ($1, $2) RETURNING *', [user_id[0]["id"], role_id[0]["id"]]);
            res.json('insert role success');
        }
        else
        res.json('fail');
    }
}

module.exports = new RoleController();