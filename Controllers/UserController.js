const User = require('../Models/User')
const PasswordTokens = require('../Models/PasswordTokens')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let secret = "minhaaplicacao"

class UserController{

    async index(req, res){

        let result = await User.findAll()
        result? res.status(200).json(result)
        : res.status(404).send("Nao existem usuarios na base de dados!")
    }

    async create(req, res){

        let { name, username, password, confirmPassword, userCategory_id, userState_id } = req.body

        if(password === confirmPassword){
                let result = await User.new(name, 
                    username, 
                    password, 
                    userCategory_id, 
                    userState_id)

                result.status? res.status(200).send("Usaurio cadastrado com sucesso!")
                    : res.status(400).send(result.error)
        }else{
            res.status(400).send("Senha de confirmacao incorreta!")
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

    async passwordRecovery(req, res){
        let { username } = req.body

        let result = await PasswordTokens.create(username)
        result.status? res.status(200).send("" + result.token)
            : res.status(400).send(result.error)
    }

    async editPassword(req, res){
        let { token, password } = req.body

        let isValid = await PasswordTokens.validate(token)
        if(isValid.status){
            let result = await User.changePassword(isValid.token.user_id, password, isValid.token.token)
            result? res.status(200).send("Senha alterada!")
                : res.status(400).send("Senha nao alterada!")
        }else{
            res.status(400).send(isValid.error)
        }
    }

    async login(req, res){
        let { username, password } = req.body

        let user = await User.findUser(username)
        if(user){
            let result = bcrypt.compare(password, user.password)
           
            if(result){
                 res.status(200).send(`Ola ${user.name}, seja bem vindo ao nosso sistema!`)
                 return
            }else{
                res.status(404).send("Senha invalida!")
                return
            }
        }else{
            res.status(404).send("O Usuario nao existe!")
            return
        }
    }
}

module.exports = new UserController()