const contractOwnVoter = require('./contract-own.voter');
const authenticatedUserVoter = require('./authenticated-user.voter');

const voterFactory = (options)=> {
  return [
    contractOwnVoter(options),
    authenticatedUserVoter(options)
  ];
};

module.exports = voterFactory;
