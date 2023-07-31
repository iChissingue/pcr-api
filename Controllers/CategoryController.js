const Category = require('../Models/Category')


class CategoryController{

    async index(req, res){

        let categoriesFound = await Category.findCategories()
        categoriesFound.length > 0? res.status(200).send(categoriesFound)
            : res.status(404).send("Nao existem categorias no banco de dados!")
    }

    async findOne(req, res){
        let { id } = req.params

        let result = await Category.findCategory(id)
        result.length > 0? res.status(200).send(result)
            : res.status(404).send("Categoria nao encontrada!")
    }

    async create(req, res){
        let { description } = req.body

        let result = await Category.new(description)
        if(result){
            res.status(200).send("Categoria cadastrada com sucesso!")
        }else{
            res.status(400).send("Nao foi possivel cadastrar a categoria!")
        }
    }

    async update(req, res){
        let { id, description } = req.body

        if(!isNaN(id)){
            let updated = await Category.edit(id, description)
            updated.status? res.status(200).send("Categoria atualizada com sucesso!")
                : res.status(400).send(updated.error)   
        }else{
            res.status(400).send("O id deve ser numerico!")
        }
    }

    async delete(req, res){
        let { id } = req.params
        if(!isNaN(id)){
            let removed = await Category.remove(id)
            removed.status? res.status(200).send("Categoria removida com sucesso!")
                : res.status(400).send(removed.error)
        }else{
            res.status(400).send("Por favor insira um valor numerico!")
        }
        
    }
}


module.exports = new CategoryController()