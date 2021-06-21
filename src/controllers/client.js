const profileService = require('../services/profile');
const jobService = require('../services/job');

const controller = {
  async makeADeposit(req, res , next) {
    const {userId} = req.params
    const { amount } = req.body;

    try {
      const profile = await profileService.getItem(userId)
      if(!profile)
        return res.status(404).end()

      const totalOfJobsToPay = await jobService.getSumOfPendingJobsByClient(userId)

      if(amount < totalOfJobsToPay * 0.25){
        res.status(403).end();
      }
      await profileService.makeADeposit(profile, amount)
      res.status(204).end();
    } catch (err) {
      console.log(err.message)
      res.status(500).end();
      next(500);
    }
  },
}

module.exports = controller;
