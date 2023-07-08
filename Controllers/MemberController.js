const Member = require('../Models/Member')

class MemberController{

    async index(req, res){
        
        let result = await Member.findAll()
        if(result != undefined){
            res.status(200).send(result)
        }else{
            res.status(404).send(result.error)
        }
       }

    async create(req, res){
        let { name, age, inheritant, sex, admissionDate, adress, contact } =req.body

    }
}

module.exports = new MemberController()