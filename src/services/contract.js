const { Op } = require("sequelize");
const { Contract } = require('../model')

const contractService = {
  async getItem(id){
    const contract = await Contract.findOne({where: {id}})
    return contract.toJSON()
  },

  async getAll(userId){
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
