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
           
            let member = await Knex.select("id", "name", "age", "inheritant", "sex", "adress_id", "contacts_id", "admissionDate")
            .where({ id: id }).table("member")
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

        let member = await Knex.select("id", "name", "age")
        .where({ name: name }).table("member")
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
        try {
            await Knex.delete().where({ id: id }).table("member")
            return {status: true}
        } catch (error) {
            return error
        }  
    }

    async edit(id, name, age, inheritant, sex, adress_id, contacts_id, admissionDate){
        let result = this.findById(id)

        if(result){
            
            let editMember ={}

            if(name != result.name){
                editMember.name = name
            }

            if(age != result.age){
                editMember.age = age
            }

            if(inheritant != result.inheritant){
                editMember.inheritant = inheritant
            }
            if(sex != result.sex){
                editMember.sex = sex
            }

            if(adress_id != result.adress_id){
                editMember.adress_id = adress_id
            }

            if(contacts_id != result.contacts_id){
                editMember.contacts_id = contacts_id
            }
           
            if(admissionDate != result.admissionDate)
            
                await Knex.update({editMember}).where({ id: result.id }).table('member')
                return true
           
            
        }else{
            return false
        }     
    }
}

module.exports = new Member()