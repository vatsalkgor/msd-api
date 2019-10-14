const connection = require("../db");

const crypto = require("crypto");
 class User {
    
    async insertUser (username, password) {
        let pass = this.doSalting(password);
        let query = `insert into msd_user (username,password,salt) VALUES('${username}','${pass.hash}','${pass.salt}')`;
        try {
            let res =  await connection.promise().query(query);
            return {is_error:false,res};
        } catch (error) {
            console.log(error);
            return {
                is_error:true,
                error
            }
        }
    }

    async validateUser(username,password){
        let query = `select * from msd_user where username='${username}'`;
        let results = await connection.promise().query(query);
        return results[0][0].password == crypto.pbkdf2Sync(password,results[0][0].salt,1000,64,'sha512').toString('hex')
    }

    doSalting(password){
        let salt = crypto.randomBytes(16).toString('hex');
        return {
            hash: crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex'),
            salt:salt
        }
    }
}
module.exports = User;