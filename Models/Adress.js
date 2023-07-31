const Knex = require('../DataBase/Connection')

class Adress{


    async findAdresses(){
        
        let adresses = await Knex.select("id", "description")
            .table("adress")
            if(adresses.length > 0){
                return adresses
            }else{
                return false
            }
    }

    async findById(id){
        
        let adress = await Knex.select("id", "description")
            .where({ id: id }).table("adress")
            if(adress.length > 0){
                return adress[0]
            }else{
                return false
            }
    }
    
    
    async findByDescription(description){
        
        let adress = await Knex.select("id", "description")
            .where({ description: description }).table("adress")
            if(adress.length > 0){
                return adress
            }else{
                return false
            }
    }


    async new(description){

        let descriptionExist = await this.findByDescription(description)
        if(!descriptionExist){
            try {
                await Knex.insert({ description }).table("adress")
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }
        }else{
            return {status: false, error: `O endereco '${description}' ja existe!`}
        }  
    }

    async edit(id, description){

        let adressExist = await this.findById(id)
        if(adressExist){
           
            if(description != adressExist.description){

                try {
                    await Knex.update({ description }).where({ id: id }).table("adress")
                    return {status: true}
                } catch (error) {
                    return {status: false, error: error}
                }    
            }else{
                return {status: false, error: "A descricao do endereco que pretende atualizar ja existe!"}
            }     
        }else{
            return {status: false, error: "O endereco que pretende atualizar nao existe!"}
        }  
    }

    async remove(id){

        let adressExist = await this.findById(id)
        if(adressExist){
            try {
                await Knex.delete().where({ id: id }).table("adress")
                return { status: true }
            } catch (error) {
                return {status: false, error: error}
            }   
        }else{
            return {status: false, error: "O endereco que pretende deletar nao existe!"}
        }    
    }
}

module.exports = new Adress()