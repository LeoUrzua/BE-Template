const express = require('express');
const bodyParser = require('body-parser');
const  AccessDecisionManagerProvider = require('@wizeline/access-decision-manager-express').default
const { isGrantedMiddleware } = require('@wizeline/access-decision-manager-express');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const voters = require('./common/voters');
const ATTRIBUTES = require('./common/attributes');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use(
  AccessDecisionManagerProvider(
    (req) => getProfile(req),
    voters({
    }))
);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id',
  isGrantedMiddleware(ATTRIBUTES.CONTRACT_GET_ONE),
  async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})
module.exports = app;
