const ATTRIBUTES = require('../attributes')

const supportedAttributes = [
  ATTRIBUTES.CONTRACT_GET_ONE
];

const contractOwnVoter = () => {
  const supports = (attribute) => {
    return supportedAttributes.includes(attribute);
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    const {id} = context.req.params;
    //TODO: Create a service and get the contract from the contract service
    const contract = {
      ContractorId: id,
      ClientId: id
    };
    if(user === null) return false
    return contract.ContractorId == user.id || contract.ClientId == user.id;
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = contractOwnVoter;
