const Member = require('../Models/member')
const Adress = require('../Models/Adress')

class MemberController{

    async index(req, res){
        
        let result = await Member.findAll()
        if(result.length >0){
            res.status(200).send(result)
        }else{
            res.status(404).send(result.error)
        }
    }

    async findOne(req, res){
        let { id } = req.params

        let member = await Member.findById(id)
        if(member){
          
            const {adress_id} = member.member
            
            const adress = await Adress.findById(adress_id)
            if(adress !== undefined){
                const Member ={...member, ...adress}
                res.status(200).send(Member)
            }else{
                res.status(203).send("O edereco e invalido!") 
            }
        }else{
            res.status(203).send("O membro solicitado nao existe!")
        }
       
    }

    async create(req, res){
        let { name, age, inheritant, sex, adress_id, contact, admissionDate  } = req.body
    
            let result = await Member.new(name, age, inheritant, sex, adress_id, contact, admissionDate)
            result.status? res.status(200).send("Membro cadastrado com sucesso!")
                : res.status(400).send(result.error)
    }

    async delete(req, res){

        let { id } = req.params
        if(!isNaN(id)){
            let removed = await Member.remove(id)
            removed.status? res.status(200).send("Membro removido com sucesso!")
                : res.status(400).send(removed.error)
        }else{
            res.status(400).send("Por favor insira um valor numerico!")
        }
    }

    async update(req, res){
        let { id, name, age, inheritant, sex, adress_id, contact, admissionDate  } =req.body

        let result = await Member.edit(id, name, age, inheritant, sex, adress_id, contact, admissionDate)
        result.status? res.status(200).send("Membro atualizado com sucesso!")
           : res.status(400).send(result.error)
    }
}

module.exports = new MemberController()