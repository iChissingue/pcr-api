const Knex = require('../DataBase/Connection')
const Adress = require('./Adress')

class Member{

    async findAll(){
        
        let members = await Knex.select("*")
            .table("member")
        if(members.length>0){
            return members
        }else{
            return {status: false, error: "Nao existem usuarios no banco de dados!"}
        }  
    }

    async findById(id){
        try {
           
            let member = await Knex.select(
                "id", 
                "name", 
                "age", 
                "inheritant", 
                "sex", 
                "adress_id", 
                "contact", 
                "admissionDate")
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

        let member = await Knex.select("*")
        .where({ name: name }).table("member")
        if(member.length > 0){
            return member[0]
        }else{
            return false
        }
    }
    
    async new(name, age, inheritant, sex, adress_id, contact, admissionDate){

        let memberExist = await this.findMember(name)
        if(!memberExist){

            let adressExist = await Adress.findById(adress_id)
            if(adressExist){
                try {
                await Knex.insert({ 
                    name, 
                    age, 
                    inheritant, 
                    sex, 
                    adress_id, 
                    contact, 
                    admissionDate 
                }).table('member')
                return {status: true}
                } catch (error) {
                    return error
                }  
            }else{
                return {status: false, error: "O endereco do membro e invalido!"}
            }   
        }else{
            return {status: false, error: "O membro que pretende cadatrar ja existe!"}
        } 
    }

    async remove(id){
        
        let memberExist = await this.findById(id)
        if(memberExist){
            try {
                await Knex.delete().where({ id: id }).table("member")
                return { status: true }
            } catch (error) {
                return {status: false, error: error}
            }   
        }else{
            return {status: false, error: "O membero que pretende deletar nao existe!"}
        }    

    }

    async edit(id, name, age, inheritant, sex, adress_id, contact, admissionDate){

        let result = await this.findById(id)

        if(result){
            

            let editMember ={}

            let nameExist = await this.findMember(name)
            if(!nameExist){
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

                if(contact != result.contact){
                    editMember.contact = contact
                }
            
                if(admissionDate != result.admissionDate){
                    editMember.admissionDate = admissionDate  
                }

                await Knex.update(editMember).where({ id: result.id }).table('member')
                return {status: true}

            }else{
                return {status: false, error: "O nome do membro ja existe!"}
            }
        }else{
            return {status: false, error: "O membro nao existe!"}
        }     
    }
}

module.exports = new Member()