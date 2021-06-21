const contractOwnVoter = require('./contract-own.voter');
const authenticatedUserVoter = require('./authenticated-user.voter');
const clientUserVoter = require('./client-user.voter');

const voterFactory = (options)=> {
  return [
    contractOwnVoter(options),
    authenticatedUserVoter(options),
    clientUserVoter(options)
  ];
};

module.exports = voterFactory;
