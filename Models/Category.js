const Knex = require('../DataBase/Connection')

class Category{

    async findCategories(){
        let categories = await Knex.select("*")
            .table("usercategory")
            if(categories.length > 0){
                return categories
            }else{
                return false
            }
        }



    async findCategory(id){
        try {
           let result = await Knex.select("*")
           .where({ id: id }).table("userCategory")
            return result[0] 
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

    async edit(id, description){

        let categoryExist = await this.findCategory(id)
        if(categoryExist){
           
            if(description != categoryExist.description){

                try {
                    await Knex.update({ description }).where({ id: id }).table("usercategory")
                    return {status: true}
                } catch (error) {
                    return {status: false, error: error}
                }    
            }else{
                return {status: false, error: "A descricao da categoria que pretende atualizar ja existe!"}
            }     
        }else{
            return {status: false, error: "A categoria que pretende atualizar nao existe!"}
        }  
    }

    async remove(id){

        let categoryExist = await this.findCategory(id)
        if(categoryExist){
            try {
                await Knex.delete().where({ id: id }).table("usercategory")
                return { status: true }
            } catch (error) {
                return {status: false, error: error}
            }   
        }else{
            return {status: false, error: "A categoria que pretende deletar nao existe!"}
        }    
    }
}

module.exports = new Category()