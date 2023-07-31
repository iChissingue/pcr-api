import User from './User'
import Knex from '../DataBase/Connection'



class PasswordTokens{

    async createPasswordToken(unsername){

        let user = await User.findUser(unsername)

        if(user != undefined){
            try {
                let token = Date.now()
                await Knex.insert({
                    token,
                    user_id: user.id,
                    used: 0
                }).table("passwordTokens")
            } catch (error) {
                return { status: false, error: error}
            } 
        }else{
            return {status: false, error: "O usuario nao existe no banco de dados!"}
        }
    }

}

module.exports = new PasswordTokens()