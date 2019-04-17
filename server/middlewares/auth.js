const { verifyToken } = require('../helpers/auth')
const User = require('../models/User')

module.exports = {
  loggedIn: (req, res, next) => {
    if ('authorization' in req.headers) {
      let token = req.headers.authorization.slice(
        req.headers.authorization.indexOf(' ') + 1
      )
      try {
        let payload = verifyToken(token)
        User
          .findById(payload._id)
          .then(user => {
            if (user) {
              req.user = user
              next()
            } else {
              res.status(400).json({ message: 'Invalid Token' })
            }
          })
          .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
      } catch {
        res.status(400).json({ message: 'Invalid Token.' })
      }
    } else {
      res.status(400).json({
        message: 'Authentication needed to perform this action.'
      })
    }
  }
}