const Knex = require('../DataBase/Connection')
const bcrypt = require('bcrypt')


class User{

    async findAll(){
        try {
            let users = await Knex.select("id", "name", "username", "userCategory_id").table("user")
            return users
        } catch (error) {
            return {status: false, error: error}
        }
    }

    async new(name, username, password, userCategory_id, userState_id){

        try {
            let hash = await bcrypt.hash(password, 5)
            await Knex.insert({ name, username, password: hash, userCategory_id, userState_id })
            .table("user")
            
        } catch (error) {
            return {status: false, error: error}
        }
    }

    async findUser(username){
        try {
            let user = await Knex.select("id", "name", "username", "userCategory_id").
            where({ username: username }).table("user")
            return user
        } catch (error) {
            return {status: false, error: error}
        }
    }

    async findById(id){
        try {
            let user = await Knex.select("*").from("user").where({ id: id })
            return user[0]
        } catch (error) {
            return {status: false, error: error}
        }
    }

    async remove(id){
        try {
            let exist = await this.findById(id)
            if(exist){
                await Knex.delete().from("user").where({ id: id })
                return true
            }else{
                return {status: false, error: "Usuario nao encontrado na base de dados!"}
            }
            
          
        } catch (error) {
            return {status: false, error: error}
        }
    }
}

module.exports = new User()