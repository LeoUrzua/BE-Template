const {sequelize} = require("../model");
const { Op } = require("sequelize");
const { Job, Contract, Profile } = require('../model')

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
  },

  async getJobAndContractByClient(jobId, clientId){
    const job = await Job.findOne({
      where: {
        id: jobId
      },
      include: [{
        model: Contract,
        required: true,
        where: {
          ClientId: clientId
        },
      }],
    });
    return job
  },

  async payJob(job, clientId, contractorId, contractId){
    await sequelize.transaction(async (t) => {

      await Profile.increment('balance', {
        by: job.price,
        where: { id: contractorId },
        t,
      })
      await Profile.decrement('balance', {
        by: job.price,
        where: { id: clientId },
        t,
      })

      await Job.update(
        {
          paid: true
        },
        {
          where: {id: job.id},
          transaction: t
        },
        )

       await Contract.update(
         {
           status: 'terminated'
         },
         {
           where: {id: contractId},
           transaction: t
         },
       )
    });
  },
}

module.exports = contractService
