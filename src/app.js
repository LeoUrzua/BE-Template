const express = require('express');
const bodyParser = require('body-parser');
const  AccessDecisionManagerProvider = require('@wizeline/access-decision-manager-express').default
const { isGrantedMiddleware } = require('@wizeline/access-decision-manager-express');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const voters = require('./common/voters');
const ATTRIBUTES = require('./common/attributes');
const contractController = require('./controllers/contracts')
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
 * @returns contract by id
 */
app.get('/contracts/:id',
  isGrantedMiddleware(ATTRIBUTES.CONTRACT_GET_ONE),
  contractController.getItem)

/**
 * @returns contracts for the authz user
 */
app.get('/contracts',
  isGrantedMiddleware(ATTRIBUTES.CONTRACT_GET_ALL),
  contractController.getAll)

module.exports = app;
