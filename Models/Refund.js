const Knex = require('../DataBase/Connection')

class Refund{


    async findById(id){
        
        let refund = await Knex.select("id", "refundDate", "refundAmmount", "interestAmmount", "member_id")
            .where({ id: id }).table("refund")
            if(refund.length > 0){
                return refund
            }else{
                return false
            }
    }
    
    
    async findByDate(refundDate){
        
        let refund = await Knex.select("id", "refundDate", "refundAmmount", "interestAmmount", "member_id")
            .where({ refundDate: refundDate }).table("refund")
            if(refund.length > 0){
                return refund
            }else{
                return false
            }
    }


    async new(refundDate, refundAmmount, interestAmmount, member_id){
        try {
            let refund = await this.findByDate(refundDate)

            if(refund.length > 0){
                return false
            }else{
                await Knex.insert({ refundDate, refundAmmount, interestAmmount, member_id })
                    .table("refund")
                return true
            }
        } catch (error) {
            return error
        }
    }

}

module.exports = new Refund()