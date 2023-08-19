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
        let refund = await Knex.select()
            .where({ refundDate: refundDate }).table("refund")
            if(refund.length > 0){
                return refund
            }else{
                return false
            }
    }

    async findByMemberId(member_id){ 
        let refund = await Knex.select()
            .where({ member_id: member_id }).table("refund")
            if(refund.length > 0){
                return refund
            }else{
                return false
            }
    }


    async new(refundDate, refundAmmount, interestPay, member_id, creator){
        // try {
            let refund = await this.findByDate(refundDate)
            if(!refund.length > 0){
                await Knex.insert({ refundDate, refundAmmount, interestPay, member_id, creator })
                    .table("refund")
                    return true
            }else{
                return false
            }
        // } catch (error) {
        //     return error
        // }
    }

}

module.exports = new Refund()