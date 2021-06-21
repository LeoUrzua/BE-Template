const { Profile } = require('../model')

const profileService = {
  async getItem(id){
    const profile = await Profile.findOne({where: {id}})
    return profile
  },
  async makeADeposit(client ,amount){
    client.balance += amount;
    await client.save();
  },
}

module.exports = profileService
