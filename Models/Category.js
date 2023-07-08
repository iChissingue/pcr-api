const Knex = require('../DataBase/Connection')

class Category{

    async findCategory(id){
        try {
           let result = await Knex.select("*").where({ id: id }).table("userCategory")
            return result 
        } catch (error) {
            return {status: false, error: error}
        } 
    }
}

module.exports = new Category()