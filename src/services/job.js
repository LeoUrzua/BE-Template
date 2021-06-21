const { Op } = require("sequelize");
const { Job, Contract } = require('../model')

const contractService = {
  async getUnpaid(userId){
    const jobs = await Job.findAll({
      where: {
        paid: { [Op.not]: true },
      },
      include: [{
        model: Contract,
        required: true,
        where: {
          status: 'in_progress',
          [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
        },
      }],
      raw: true
    })
    return jobs
  }
}

module.exports = contractService
