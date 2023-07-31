const User = require('../Models/User')

class UserController{

    async index(req, res){

        let result = await User.findAll()
        result? res.status(200).json(result)
        : res.status(404).send("Nao existem usuarios na base de dados!")
    }

    async create(req, res){

        let { name, username, password, confirmPassword, userCategory_id, userState_id } = req.body

        if(password == confirmPassword){
            let user =  await User.findUser(username)
            let exist = user

            if(!exist){
                let result = await User.new(name, username, password, userCategory_id, userState_id)
                if(result){
                    res.status(200).send(result)
                    return
                }else{
                    res.status(400).json(result.error)
                    return
                }
            }else{
                res.status(400).send("O usuario que pretende cadastrar ja existe!")
            }

        }else{
            res.status(400).send("Senha de confirmacao errada!")
        }    
    }

    async delete(req, res){
        let { id } = req.params

        if(!isNaN(id)){
            let isDeleted = await User.remove(id)
            isDeleted.status? res.status(200).send(isDeleted)
            : res.status(406).send(isDeleted.error)
        }else{
            res.status(400).send("Digite um valor numerico!")
        }

    }
}

module.exports = new UserController()