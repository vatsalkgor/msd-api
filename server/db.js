const mysql = require("mysql2");
const dotenv = require("dotenv")
dotenv.config();
let connection = undefined;
module.exports = {
    getPool: ()=>{
        if(connection) return connection;
        connection = mysql.createPool({
            host:'localhost',
            user:'root',
            password:'',
            database:'msd',
            multipleStatements:true
        })
        return connection;
    }
};