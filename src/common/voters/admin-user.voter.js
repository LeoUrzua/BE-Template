const adminVoter = () => {
  const supports = (_attribute) => {
    return true;
  }

  const voteOnAttribute = async (attribute, subject, user, context) => {
    if(context.req.headers.admin == null) return false
    return context.req.headers.admin
  };

  return {
    supports,
    voteOnAttribute,
  };

}

module.exports = adminVoter;
