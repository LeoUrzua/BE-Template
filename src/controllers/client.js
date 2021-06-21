const profileService = require('../services/profile');
const jobService = require('../services/job');

const controller = {
  async makeADeposit(req, res , next) {
    const {userId} = req.params
    const { amount } = req.body;

    try {
      const profile = await profileService.getItem(userId)
      if(!profile) return res.status(404).end()

      const totalOfJobsToPay = await jobService.getSumOfPendingJobsByClient(userId)

      if(amount < totalOfJobsToPay * 0.25){
        res.status(403).end();
      }
      await profileService.makeADeposit(userId, amount)
      res.status(200);
      next();
    } catch (err) {
      res.status(500).end();
      next(500);
    }
  },
}

module.exports = controller;
