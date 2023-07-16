const Knex = require('../DataBase/Connection')

class Category{

<<<<<<< HEAD
    async findCategories(){
        try {
           let result = await Knex.select("*").table("userCategory")
            return result 
        } catch (error) {
            return {status: false, error: error}
        } 
    }


=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a
    async findCategory(id){
        try {
           let result = await Knex.select("*").where({ id: id }).table("userCategory")
            return result 
        } catch (error) {
            return {status: false, error: error}
        } 
    }
<<<<<<< HEAD

    async new(description){
        try {
            await Knex.insert({ description }).table("userCategory")
            return true
        } catch (error) {
            return {status: false, error: "Erro ao cadastrar a categoria!"}
        }
        
    }
=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a
}

module.exports = new Category()