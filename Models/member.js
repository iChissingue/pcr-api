const Knex = require('../DataBase/Connection')

class Member{

    async findAll(){
        

        let members = Knex.select("*").table("member")
        if(members != undefined){
            return members
        }else{
            return {status: false, error: "Nao existem usuarios no banco de dados!"}
        }
        
    }
    
    async new(name, age, inheritant, sex, admissionDate, adress, contact){

    }
}

module.exports = new Member()