const contractOwnVoter = require('./contract-own.voter');

const voterFactory = (options)=> {
  return [
    contractOwnVoter(options)
  ];
};

module.exports = voterFactory;
