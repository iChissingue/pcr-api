const Savings = require('../Models/Savings')


class SavingsController{

    async index(req, res){

        let savings = await Savings.findSavings()
        if(savings.length > 0){
            res.status(200).send(savings)
        }else{
            res.status(404).send(savings.error)
        }
    }

    async findToReport(req, res){
       const {startDate, endDate} = req.params
        console.log(startDate)
        console.log(endDate)
        const response = await Savings.findBetweenDates(startDate, endDate)
        if(response){
            res.status(200).send(response)
        }else{
            res.status(203).send("Nao houve poupancas dentro deste periodo!")
        }
    }

    async create(req, res){
        let { savingsDate, savingsAmmount, sFund, member_id } = req.body

        let result = await Savings.new(savingsDate, savingsAmmount, sFund, member_id)
        if(result){
            res.status(200).send("Poupanca cadastrada com sucesso!")
        }else{
            res.status(400).send("O membro ja poupou para esse dia!")
        }
    }

    async delete(req, res){
        let { id } = req.body
        
        let result = await Savings.remove(id)
        if(result.status){
            res.status(200).send("Poupanca deletada com sucesso!")
        }else{
            res.status(400).send(result)
        }
    }
}

module.exports = new SavingsController()