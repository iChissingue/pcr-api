const Knex = require('../DataBase/Connection')

class Category{

    async findCategories(){
        try {
           let result = await Knex.select("*").table("userCategory")
            return result 
        } catch (error) {
            return {status: false, error: error}
        } 
    }


    async findCategory(id){
        try {
           let result = await Knex.select("*").where({ id: id }).table("userCategory")
            return result 
        } catch (error) {
            return {status: false, error: error}
        } 
    }

    async new(description){
        try {
            await Knex.insert({ description }).table("userCategory")
            return true
        } catch (error) {
            return {status: false, error: "Erro ao cadastrar a categoria!"}
        }
        
    }
}

module.exports = new Category()