const Knex = require('../DataBase/Connection')


class Loan{

    async findLoans(){
        let Loans = await Knex.select("*").table("loan")
        return Loans

    }

    async findByDate(loanDate){
        let loan = await Knex.select("id", "loanDate", "loanAmmount", "member_id")
            .where({ loanDate: loanDate }).table("loan")
            if(loan.length >0){
                return loan
            }else{
                 return false
            }
    }

    async findByMemberId(member_id){
        let loan = await Knex.select()
            .where({ member_id: member_id }).table("loan")
            if(loan.length >0){
                return loan
            }else{
                 return false
            }
    }


    async new(loanDate, loanAmmount, interestAmmount, member_id, creator){

        let loan = await this.findByDate(loanDate)
        if(loan){
            return false
        }else{
            
            await Knex.insert({ loanDate, loanAmmount, interestAmmount, member_id, creator }).table("loan")
            return true
        }
        
    }
}

module.exports = new Loan()