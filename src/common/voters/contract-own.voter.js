const ATTRIBUTES = require('../attributes');
const contractService = require('../../services/contract');

const supportedAttributes = [
  ATTRIBUTES.CONTRACT_GET_ONE
];

const contractOwnVoter = () => {
  const supports = (attribute) => {
    return supportedAttributes.includes(attribute);
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    const {id} = context.req.params;
    const contract = await contractService.getItem(id)
    if(user === null) return false
    return contract.ContractorId === user.id || contract.ClientId === user.id;
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = contractOwnVoter;
