const User = require ('./User')
const Knex=  require('../DataBase/Connection')



class PasswordTokens{

    async create(unsername){

        let user = await User.findUser(unsername)

        if(user != undefined){
            try {
                let token = Date.now()
                await Knex.insert({
                    token,
                    user_id: user.id,
                    used: 0
                }).table("passwordTokens")
                return {status: true, token}
            } catch (error) {
                return { status: false, error: error}
            } 
        }else{
            return {status: false, error: "O usuario nao existe no banco de dados!"}
        }
    }

    async validate(token){

        let result = await Knex.select()
            .from("passwordTokens").where({ token: token})
        if(result.length > 0){
            let tk = result[0]

            if(tk.used){
                return { status: false, error: "Token usado!" }
            }else{
                return { status: true, token: tk }
            }
        }else{
            return{ status: false, error: "Token invalido!"}
        }
    }

    async setUsed(token){
        await Knex.update({used: 1}).where({token: token}).table("PasswordTokens")
    }
}

module.exports = new PasswordTokens()