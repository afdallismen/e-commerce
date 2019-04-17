const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  createToken: payload => {
    return jwt.sign({
      _id: payload.id,
      username: payload.username,
      email: payload.email
    }, process.env.JWT_SECRET)
  },
  verifyToken: token => jwt.verify(token, process.env.JWT_SECRET),
  hashPassword: pwd => bcrypt.hashSync(pwd),
  comparePassword: (str, hash) => bcrypt.compareSync(str, hash)
}