const { User } = require('../models')
const { createToken } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(201).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      }))
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static login (req, res) {
    User
      .findOne({
        $or: [
          { username: req.body.login },
          { email: req.body.login }
        ]
      })
      .select('+password')
      .then(user => {
        if (user && user.comparePassword(req.body.password)) {
          let token = createToken(user)
          let payload = {
            token,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email
            }
          }
          res.status(201).json(payload)
        } else {
          res.status(400).json({ message: 'Wrong login or password.' })
        }
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}

module.exports = Auth