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
}

module.exports = controller;
