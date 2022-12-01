const { log } = require('console');
const dotenv = require("dotenv")
const db = require('../../config/postgres.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class AuthenticationController {
    async signUp(req, res) {
        // {user_name: value, password: value, address: value, date_of_birth: value, code: value}
        let formData = req.body;
        console.log("formData: " + formData);
        console.log(`select user_name from users where user_name = '${formData["user_name"]}'`);
        let checkUser = await db.query(`select user_name from users where user_name = '${formData["user_name"]}'`);
        console.log("checkuser: " + checkUser);
        if (checkUser.length > 0) return res.json('fail');
        else {
            bcrypt.hash(formData["password"], saltRounds, function (err, hash) {
                // Store hash (pass) in your password DB.
                formData["password"] = hash;
                db.query(`Insert into users (user_name, password, address, date_of_birth, code) 
                values ($1, $2, $3, $4, $5) RETURNING *`, Object.values(formData));
                res.json('success');
            });

        }
    }

    async logIn(req, res) {
        let formData = req.body; //{user_name: value, password=value}
        console.log("formData: ", JSON.stringify(formData));
        let checkUser = await db.query(`select user_name, password, role_name from  users, role_mapping,roles where users.user_name=$1 and role_mapping.role_id = roles.id and users.id=role_mapping.user_id;`, [formData["user_name"]]);
        console.log(checkUser);
        //checkUser if exist
        if (checkUser && checkUser.length > 0) {
            console.log("user exist: " + JSON.stringify(checkUser[0]));
            let checkPass = checkUser[0]["password"];
            console.log("checkpass");
            console.log(checkPass);

            //check pass
            let checkPassAct = await bcrypt.compare(formData["password"], checkPass)
                .then((result) => result);

            if (checkPassAct) {
                console.log("login");
                const token = jwt.sign({ data: { user_name: formData["user_name"], role: checkUser[0]["role_name"] } }, process.env.MY_SECRET_KEY, { expiresIn: '1h' });
                console.log("token: " + token);
                res.json('success login');
            }
            else res.json('fail login');

        }
    }
}

module.exports = new AuthenticationController;


