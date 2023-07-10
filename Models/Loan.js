const Knex = require('../DataBase/Connection')


class Loan{

    async findLoans(){
        let Loans = await Knex.select("*").table("loan")
        return Loans

    }

    async new(loanDate, loanAmmount, member_id){
        await Knex.insert({ loanDate, loanAmmount, member_id }).table("loan")
        return true
    }
}

module.exports = new Loan()