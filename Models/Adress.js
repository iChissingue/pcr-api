const Knex = require('../DataBase/Connection')

class Adress{


    async findById(id){
        
        let adress = await Knex.select("id", "description")
            .where({ id: id }).table("adress")
            if(adress.length > 0){
                return adress
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
        try {
            let adress = await this.findByDescription(description)

            if(adress.length > 0){
                return false
            }else{
                await Knex.insert({ description })
                    .table("adress")
                return true
            }
        } catch (error) {
            return error
        }
    }

}

module.exports = new Adress()