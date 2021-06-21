const jobService = require('../services/job');

const controller = {
  async getUnpaid(req, res , next) {
    const {id: userId} = req.user;
    try {
      const unpaidJobs = await jobService.getUnpaid(userId)
      if(!unpaidJobs) return res.status(404).end()
      res.status(200).json(unpaidJobs);
      next();
    } catch (err) {
      console.log(err)
      res.status(500).end();
      next(500);
    }
  },

  async payJob(req, res , next) {
    const {id: userId, balance} = req.user;
    const {job_id: jobId} = req.params;
    try {
      const job = await jobService.getJobAndContractByClient(jobId, userId)
      if(!job) return res.status(404).end()
      if (job.paid)
        return res.status(409).end();
      if (balance <= job.price)
        return res.status(409).end();
      const contractorId = job.Contract.ContractorId
      const contractId = job.Contract.id
      //TODO: fix this, it's returning 404 even when this call is being completed successfully
      await jobService.payJob(job, userId, contractorId, contractId)
      res.status(204);
      next();
    } catch (err) {
      console.log(err)
      res.status(500).end();
      next(500);
    }
  },
}

module.exports = controller;
