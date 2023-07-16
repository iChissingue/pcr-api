const Member = require('../Models/Member')

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
            res.status(200).send(member)
        }else{
            res.status(400).send("O membro solicitado nao existe!")
        }
       
    }

    async create(req, res){
        let { name, age, inheritant, sex, adress_id, contacts_id, admissionDate  } =req.body

        let member = await Member.findMember(name)
        
        if(!member){
            let result = await Member.new(name, age, inheritant, sex, adress_id, contacts_id, admissionDate)
            
            if(result){
                res.status(200).send("Membro cadastrado com sucesso!")
            }else{
                res.stattus(400).send("falha no serivdor!")
            }
        }else{
            res.status(400).send("O membro que pretende cadastrar ja existe no banco de dados!")
        }
    }

    async delete(req, res){
        let { id } = req.body

        let result = await Member.findById(id)
        
        if(result){
            let removed = await Member.remove(id)
            if(removed){
                res.status(200).send("Membro removido com sucesso!")
            }else{
                res.status(405).send("nao foi possivel remover o membro!")
            }
        }else{
            res.status(404).send("O membro nao foi encontrado na base de dados!")
        }
    }

    async update(req, res){
        let { id, name, age, inheritant, sex, adress_id, contacts_id, admissionDate  } =req.body

        let result = await Member.edit(id, name, age, inheritant, sex, adress_id, contacts_id, admissionDate)
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).send("Nao foi possivel atualizar o membro!")
        }
    }
}

module.exports = new MemberController()