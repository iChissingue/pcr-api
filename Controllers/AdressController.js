const Adress = require('../Models/Adress')


class AdressController{

    async findAdress(req, res){
        let { id } = req.params

        if(!isNaN(id)){
            let adress = await Adress.findById(id)
            if(adress.length > 0){
                res.status(200).send(adress[0])
            }else{
                res.status(400).send("O reembolso requisitado nao existe!")
            }
        }
    }

    async create(req, res){
        let { description } = req.body
        
            let result = await Adress.new(description)
            if(result){
                res.status(200).send("Endereco gravado com sucesso!")
            }else{
                res.status(400).send(`O endereco que pretende cadastrar ja existe!`)
            }
        
    }
}

module.exports = new AdressController()