module.exports = {
  isSelf: (req, res, next) => {
    if (req.params.user_id == req.user._id) {
      next()
    } else {
      res.status(401).json({ message: 'Unauthorized access.' })
    }
  }
}