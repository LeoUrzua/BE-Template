const adminVoter = () => {
  const supports = (_attribute) => {
    return true;
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    return context.req.get('admin')
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = adminVoter;
