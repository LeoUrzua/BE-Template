const { Profile } = require('../model')

const contractService = {
  async getItem(id){
    const profile = await Profile.findOne({where: {id}, raw: true})
    return profile
  },
  async makeADeposit(profileId, amount){
    const [a, b] = await Profile.increment('balance', {
      returning: true,
      by: amount,
      where: { id: profileId },
    })
    //TODO: check why this is returning [ undefined, 1 ] undefined
    console.log(a, b)
  },
}

module.exports = contractService
