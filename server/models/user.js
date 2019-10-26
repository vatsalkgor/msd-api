const connection = require("../db");
const crypto = require("crypto");
const c = connection.getPool();
 class User {
    
    async insertUser (username, password) {
        let pass = this.doSalting(password);
        let query = `insert into msd_user (username,password,salt) VALUES('${username}','${pass.hash}','${pass.salt}')`;
        try {
            let res =  await c.promise().query(query);
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
        let results = await c.getPool().promise().query(query);
        return results[0][0].password == crypto.pbkdf2Sync(password,results[0][0].salt,1000,64,'sha512').toString('hex')
    }

    doSalting(password){
        let salt = crypto.randomBytes(16).toString('hex');
        return {
            hash: crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex'),
            salt:salt
        }
    }

    async insertPreference(preference){
        console.log(preference)
        let rows = await c.promise().query(`insert into msd_pref (user_id,preference) VALUES ?`,[preference]);
        return rows[0];
    }
    
    async getPreference(user_id){
        let rows = await c.promise().query(`select preference from msd_pref where user_id=${user_id}`);
        let preferences = [];
        rows[0].forEach(e=>{
            preferences.push(e.preference);
        });
        return preferences;
    }
}
module.exports = User;