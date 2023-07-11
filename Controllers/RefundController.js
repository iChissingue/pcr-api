const Refund = require('../Models/Refund')


class RefundController{

    async findRefund(req, res){
        let { id } = req.params

        if(!isNaN(id)){
            let refund = await Refund.findById(id)
            if(refund.length > 0){
                res.status(200).send(refund[0])
            }else{
                res.status(400).send("O reembolso requisitado nao existe!")
            }
        }
    }

    async create(req, res){
        let { refundDate, 
            refundAmmount, 
            interestAmmount, 
            member_id } = req.body
        
            let result = await Refund.new( refundDate, refundAmmount, interestAmmount, member_id)
            if(result){
                res.status(200).send("Reembolso gravado com sucesso!")
            }else{
                res.status(400).send(`Ja existe um reembolso para o dia ${refundDate}!`)
            }
        
    }
}

module.exports = new RefundController()