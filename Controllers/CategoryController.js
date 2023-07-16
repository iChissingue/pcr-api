const Category = require('../Models/Category')


class CategoryController{

    async findOne(req, res){
        let { id } = req.params

        let result = await Category.findCategory(id)
        if(result.length > 0){
            res.status(200).send(result)
        }
    }

    async index(req, res){

        let categories = await Category.findCategories()
        if(categories.length > 0){
            res.status(200).send(categories)
        }else{
            res.status(404).send("Nao existem categorias no banco de dados!")
        }
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
}


module.exports = new CategoryController()