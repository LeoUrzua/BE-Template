const ATTRIBUTES = require('../attributes');

const supportedAttributes = [
  ATTRIBUTES.JOB_PAY,
];

const clientUserVoter = () => {
  const supports = (attribute) => {
    return supportedAttributes.includes(attribute);
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    if(user === null) return false;
    return user.type === 'client';

  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = clientUserVoter;
