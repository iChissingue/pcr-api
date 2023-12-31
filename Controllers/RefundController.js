const Refund = require('../Models/Refund')


class RefundController{

    async index(req, res){
        let refunds = await Refund.allRefunds()
        if(refunds){
            res.status(200).send(refunds)
        }else{
            res.status(203).send("Reembolsos nao encontados!")
        }
    }

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
            interestPay, 
            member_id,
            creator 
        } = req.body
        
            let result = await Refund.new( refundDate, refundAmmount, interestPay, member_id, creator)
            if(result){
                res.status(200).send("Reembolso gravado com sucesso!")
            }else{
                res.status(400).send(`Ja existe um reembolso para o dia ${refundDate}!`)
            }
        
    }
}

module.exports = new RefundController()