const Loan = require('../Models/Loan')

class LoanController{
    async index(req, res){
        
        let result = await Loan.findLoans()
        if(result.length >0){
            res.status(200).send(result)
        }else{
            res.status(404).send("Nao existem emprestimos no banco de dados!")
        }
    }

    async create(req, res){
        let { loanDate, loanAmmount, interestAmmount, member_id, creator } = req.body

        let result = await Loan.new(loanDate, loanAmmount, interestAmmount, member_id, creator)
        if(result){
            res.status(200).send("Emprestimo gravado sucesso!")
        }else{
            res.status(404).send(`O membro ja te um emprestimo para o dia ${loanDate}!`)
        }
    }
}

module.exports = new LoanController()