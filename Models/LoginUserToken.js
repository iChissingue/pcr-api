const Knex = require('../DataBase/Connection')

class LoginUserToken{

    async new(token, user_id){
        await Knex.insert({token, user_id}).table("userLoginToken")
        return true
    }

    async validate(token){
        let result = await Knex.select("token")
            .from("userLoginToken").where({ token: token})
        if(result.length > 0){
            return { status: true, token: "Token valido" }
            
        }else{
            return{ status: false, error: "Token invalido!"}
        }
    }
}

module.exports = new LoginUserToken()