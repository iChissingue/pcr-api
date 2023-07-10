const Knex = require('../DataBase/Connection')

class Savings{
    async findSavings(){
        try {
           let savings = await Knex.select("*").table("savings")
            if(savings.length >0){
                return savings
            }else{
                return {status: false, error: "Nao existem membros na base de dados!"}
            } 
        } catch (error) {
            return error
        }
    }

    async findById(id){
    
        let saving = await Knex.select("id", "savingsDate", "savingsAmmount", "sFund", "member_id")
        .where({ id: id }).table("savings")
       
        if(saving.length >0){
           return saving[0] 
        }else{
           return false
        }

    }
    async findByDate(savingsDate){

        let saving = await Knex.select("id", "savingsDate", "savingsAmmount", "sFund", "member_id")
        .where({ savingsDate: savingsDate }).table("savings")
        return saving
    }

    async new(savingsDate, savingsAmmount, sFund, member_id){

        let result = await this.findByDate(savingsDate)
        if(!result.length >0){
            await Knex.insert({ savingsDate, savingsAmmount, sFund, member_id }).table("savings")
            return true
        }else{
            return false
        } 
    }

    async remove(id){

        let saving = this.findById(id)
        if(saving != {}){
            try {
                await Knex.delete().where({ id: id }).table("savings")
                return saving 
            } catch (error) {
                return error
            }
        }else{
            return {status: false, error: "A poupanca que pretende deletar nao existe!"}
        }
        
          
    }

}

module.exports = new Savings()