const {QueryTypes} = require("sequelize");
const {Contract} = require("../model");
const {Op} = require("sequelize");
const {Job} = require("../model");
const {sequelize} = require("../model");
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
  async getBestProfession(startDate, endDate){

    const bestProfession = await sequelize.query(`
        SELECT p.profession 'profession' FROM Profiles p, Contracts c
        LEFT JOIN Jobs j ON c.id = j.ContractId
        WHERE p.id = c.ContractorId AND j.paid = 1 AND j.paymentDate BETWEEN '${startDate}' AND '${endDate}'
        GROUP BY p.profession
        ORDER BY sum(j.price) DESC
        LIMIT 1
    `, { type: QueryTypes.SELECT });

    return bestProfession
  }
}

module.exports = profileService
