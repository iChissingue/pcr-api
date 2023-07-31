const Adress = require('../Models/Adress')


class AdressController{

    async index(req, res){
        
        let adressesFound = await Adress.findAdresses()
        adressesFound.length > 0? res.status(200).send(adressesFound)
            : res.status(400).send("Nao existem enderecos no banco de dados!")
    }

    async findAdress(req, res){
        let { id } = req.params

        if(!isNaN(id)){
            let adress = await Adress.findById(id)
            if(adress.length > 0){
                res.status(200).send(adress[0])
            }else{
                res.status(400).send("O endereco requisitado nao existe!")
            }
        }
    }

    async create(req, res){
        let { description } = req.body
        
        let descriptionIsSaved = await Adress.new(description)
        descriptionIsSaved.status? res.status(200).send("Endereco gravado com sucesso!")
            : res.status(400).send(descriptionIsSaved.error)
    }

    async update(req, res){
        let { id, description } = req.body

        if(!isNaN(id)){
            let updated = await Adress.edit(id, description)
            updated.status? res.status(200).send("Endereco atualizado com sucesso!")
                : res.status(400).send(updated.error)   
        }else{
            res.status(400).send("O id deve ser numerico!")
        }
    }

    async delete(req, res){
        let { id } = req.params
        if(!isNaN(id)){
            let removed = await Adress.remove(id)
            removed.status? res.status(200).send("Endereco removido com sucesso!")
                : res.status(400).send(removed.error)
        }else{
            res.status(400).send("Por favor insira um valor numerico!")
        }
        
    }
}

module.exports = new AdressController()