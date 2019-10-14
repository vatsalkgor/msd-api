const mysql = require("mysql2");
const dotenv = require("dotenv")
dotenv.config();

let connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'msd',
    multipleStatements:true
})

connection.connect((err)=>{
    if(err) throw err;
});

module.exports = connection;