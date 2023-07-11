const Knex = require('../DataBase/Connection')

class Contact{


    async findById(id){
        
        let contact = await Knex.select("id", "contact1", "contact2")
            .where({ id: id }).table("contacts")
            if(contact.length > 0){
                return contact
            }else{
                return false
            }
    }
    
    async new(contact1, contact2){
        try {
            await Knex.insert({ contact1, contact2 })
                .table("contacts")
            return true
        
        } catch (error) {
            return error
        }
    }

}

module.exports = new Contact()