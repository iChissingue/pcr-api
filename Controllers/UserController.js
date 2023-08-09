const User = require('../Models/User')
const LoginUserToken =require('../Models/LoginUserToken')
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

        if(username != null && password != null){

            let user = await User.findUser(username)
            if(user){
                let result = await bcrypt.compare(password, user.password)
               
                if(result){
                    let token = jwt.sign({ 
                        name: user.name,
                        username: user.username, 
                        userCategory_id: user.userCategory_id 
                    }, secret)
                    await LoginUserToken.new(token, user.id)
                     res.status(200).json({token: token})
                     return
                }else{
                    res.status(203).send("Senha invalida!")
                    return
                }
            }else{
                res.status(203).send("O Usuario nao existe!")
                return
            }
        }else{
            res.status(400).send("Preenche os campos e tenta novamente!")
        }
    }

    async getLoginCredentials(req, res){
        const authToken = req.headers['authorization']

        if(authToken != undefined){
            let bearer = authToken.split(' ')
            let token = bearer[1]
            try {
                let decoded = jwt.verify(token, secret)
                res.status(200).send(decoded)
            } catch (error) {
                res.send(error.message)
            }   
        }else{
            res.status(403).send("Autentique-se para acessar as informacoes requeridas!")
            return
        }
    }

    async loginTokenValidate(req, res){
        const { token } = req.body
        if(token != undefined){

            const isValidToken = await LoginUserToken.validate(token)
            isValidToken.status? res.status(200).send(isValidToken.token)
            : res.status(203).send(isValidToken.error)
        }else{
            res.status(203).send("O token nao existe!")
        }

    }
}

module.exports = new UserController()