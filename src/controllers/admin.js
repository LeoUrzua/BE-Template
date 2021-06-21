const profileService = require('../services/profile');

const controller = {
  async getBestProfession(req, res , next) {
    const { start: startDate, end: endDate } = req.query;

    try {
      const bestProfession = await profileService.getBestProfession(startDate, endDate)
      if(bestProfession.length === 0) return res.status(404).end()

      res.status(200).json(bestProfession);
      next()
    } catch (err) {
      console.log(err.message)
      res.status(500).end();
      next(500);
    }
  },
}

module.exports = controller;
