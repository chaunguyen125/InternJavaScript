const { log } = require('console');
const dotenv = require("dotenv")
const db = require('../../config/postgres.config');
const jwt = require('jsonwebtoken');
class AuthenticationController {
    async signUp(req, res) {
        // {user_name: value, password: value, address: value, date_of_birth: value, code: value}
        let formData = req.body;
        console.log("formData: " + formData);
        console.log(`select user_name from users where user_name = '${formData["user_name"]}'`);
        let checkUser = await db.query(`select user_name from users where user_name = '${formData["user_name"]}'`);
        console.log("checkuser: " + checkUser);
        if (checkUser.length == 1) return res.json('fail');
        else db.query(`Insert into users (user_name, password, address, date_of_birth, code) 
        values ($1, $2, $3, $4, $5) RETURNING *`, Object.values(formData));
        res.json('success');
    }

    async logIn(req, res) {
        let formData = req.body; //{user_name: value, password=value}
        console.log("formData: " + formData);
        let checkUser = await db.query(`select user_name from users where user_name = '${formData["user_name"]}'`);
        //checkUser if exist
        if (checkUser.length == 1) {
            console.log("user exist: " + checkUser[0]);
            let checkPass = await db.query(`select password from users where user_name = '${formData["user_name"]}'`);
            console.log(checkPass);
            if (checkPass[0]["password"] === formData["password"]) {
                console.log("login");
                const token = jwt.sign({ data: {user_name: formData["user_name"]} }, process.env.MY_SECRET_KEY, { expiresIn: '1h' });
                console.log("token: "+token);
            }
            else console.log("fail");
        }
        res.json('success');
    }
}

module.exports = new AuthenticationController;


