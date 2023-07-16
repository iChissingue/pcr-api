const Adress = require('../Models/Adress')
const Contact = require('../Models/Contact')


class ContactController{

    async findContact(req, res){
        let { id } = req.params

        if(!isNaN(id)){
            let contact = await Contact.findById(id)
            if(contact.length > 0){
                res.status(200).send(contact[0])
            }else{
                res.status(400).send("O reembolso requisitado nao existe!")
            }
        }
    }

    async create(req, res){
        let { contact1, contact2 } = req.body
        
            let result = await Contact.new(contact1, contact2)
            if(result){
                res.status(200).send("Contacto gravado com sucesso!")
            }else{
                res.status(400).send(`O contacto que pretende cadastrar ja existe!`)
            }
        
    }
}

module.exports = new ContactController()