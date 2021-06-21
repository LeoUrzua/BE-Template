const { Contract } = require('../model')

const contractService = {
  async getItem(id){
    const contract = await Contract.findOne({where: {id}, raw: true})
    return contract
  }
}

module.exports = contractService
