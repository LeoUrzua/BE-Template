const getProfile = async (req, res, next) => {
  const {Profile} = req.app.get('models')
  const profileId = req.get('profile_id')
  if(!profileId) return null
  const profile = await Profile.findOne({where: {id: req.get('profile_id')}, raw: true})
  if(!profile) return null
  req.user = profile
  return profile
}

module.exports = {getProfile}
