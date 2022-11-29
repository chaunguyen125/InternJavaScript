const { Client } = require("pg")
const dotenv = require("dotenv")

dotenv.config()

const client = new Client({
    user: process.env.PGUSER, // db
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
    // user:"postgres",
    // host:"localhost", ???
    // database:"exo",
    // password:"postgres",
    // port:"5432"
})

module.exports = {
    connectDb: async () => {
        await client.connect()
        console.log('connect db');
    },
    query: async (input, values) => {
        const res = await client.query(input, values)
        return res.rows
    }
};