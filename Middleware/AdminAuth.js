const jwt = require('jsonwebtoken')
let secret = "minhaaplicacao"

module.exports = function(req, res, next){
    
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        let bearer = authToken.split(' ')
        let token = bearer[1]

        let decoded = jwt.verify(token, secret)
        console.log(decoded)
        next()
    }else{
        res.status(403).send("Autentique-se para acessar as informacoes requeridas!")
        return
    }
}