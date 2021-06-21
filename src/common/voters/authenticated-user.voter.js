const ATTRIBUTES = require('../attributes');

const supportedAttributes = [
  ATTRIBUTES.CONTRACT_GET_ALL,
  ATTRIBUTES.JOB_UNPAID,
];

const contractOwnVoter = () => {
  const supports = (attribute) => {
    return supportedAttributes.includes(attribute);
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    return user !== null
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = contractOwnVoter;
