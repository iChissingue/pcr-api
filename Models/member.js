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

    async findById(id){
        try {
           
            let member = await Knex.select("id", "name", "age").where({ id: id }).table("member")
            if(member.length > 0){
                return member[0]
        }else{
            return false
        }
        } catch (error) {
            return error
        }
    }


    async findMember(name){

        let member = await Knex.select("id", "name", "age").where({ name: name }).table("member")
        if(member.length > 0){
            return member[0]
        }else{
            return false
        }
    }
    
    async new(name, age, inheritant, sex, adress_id, contacts_id, admissionDate){
        try {
            await Knex.insert({ name, age, inheritant, sex, adress_id, contacts_id, admissionDate }).table('member')
            return true
        } catch (error) {
            return error
        }  
    }

    async remove(id){
        await Knex.delete().where({ id: id }).table("member")
        return true
    }
}

module.exports = new Member()