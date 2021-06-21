const ATTRIBUTES = require('../attributes');

const supportedAttributes = [
  ATTRIBUTES.CONTRACT_GET_ALL
];

const contractOwnVoter = () => {
  const supports = (attribute) => {
    return supportedAttributes.includes(attribute);
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    console.log(`u: `, user)
    console.log(`u: `, user !== null)

    return user !== null
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = contractOwnVoter;
