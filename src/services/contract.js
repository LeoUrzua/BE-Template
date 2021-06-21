const { Op } = require("sequelize");
const { Contract } = require('../model')

const contractService = {
  async getItem(id){
    const contract = await Contract.findOne({where: {id}, raw: true})
    return contract
  },

  async getAll(userId){
    console.log(`userAAA: `, userId)
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [
          { ClientId: userId },
          { ContractorId: userId }
        ]
      },
      raw: true})
    return contracts
  }
}

module.exports = contractService
