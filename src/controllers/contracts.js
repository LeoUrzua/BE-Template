const contractService = require('../services/contract');

const controller = {
  async getItem(req, res , next) {
    const {id} = req.params
    try {
      const contract = await contractService.getItem(id)
      if(!contract) return res.status(404).end()
      res.status(200).json(contract);
      next();
    } catch (err) {
      res.status(500).end();
      next(500);
    }
  },
}

module.exports = controller;
