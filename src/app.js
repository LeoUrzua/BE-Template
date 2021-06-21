const express = require('express');
const bodyParser = require('body-parser');
const  AccessDecisionManagerProvider = require('@wizeline/access-decision-manager-express').default
const { isGrantedMiddleware } = require('@wizeline/access-decision-manager-express');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const voters = require('./common/voters');
const ATTRIBUTES = require('./common/attributes');
const contractController = require('./controllers/contracts')
const jobController = require('./controllers/jobs')
const clientController = require('./controllers/client')
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

/**
 * @returns unpaid jobs for a user
 */
app.get('/jobs/unpaid',
  isGrantedMiddleware(ATTRIBUTES.JOB_UNPAID),
  jobController.getUnpaid)

/**
 * @returns null
 */
app.post('/jobs/:job_id/pay',
  isGrantedMiddleware(ATTRIBUTES.JOB_PAY),
  jobController.payJob)

/**
 * @returns 204 if the resource was updated successfully
 */
app.post('/balances/deposit/:userId',
  isGrantedMiddleware(ATTRIBUTES.CLIENT_DEPOSIT),
  clientController.makeADeposit)

module.exports = app;
