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
const adminController = require('./controllers/admin')
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
 * @returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
 */
app.get('/contracts',
  isGrantedMiddleware(ATTRIBUTES.CONTRACT_GET_ALL),
  contractController.getAll)

/**
 * @returns all unpaid jobs for a user (either a client or contractor), for active contracts only.
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

/**
 * @returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 */
app.get('/admin/best-profession',
  isGrantedMiddleware(ATTRIBUTES.PROFILE_BEST_PROFESSION),
  adminController.getBestProfession)

/**
 * @returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2
 */
app.get('/admin/best-clients',
  isGrantedMiddleware(ATTRIBUTES.PROFILE_BEST_CLIENTS),
  adminController.getBestClient)


module.exports = app;
