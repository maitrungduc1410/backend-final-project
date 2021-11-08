const jwt = require('jsonwebtoken')
const { SECRET } = require('../env') // JWT secret (used to sign and verify token)

function isAuthenticated(req, res, next) {
  const token = req.headers['auth-token']
  next()

  // TODO: verify the token against the , if success -> call next() otherwise throw 401 error
  // if success we take the result 

  // Sample:
  // if (success) {
  //   req.user = 
  //   next()
  // } else {
  //   res.status(401).send('Unauthenticated')
  // }
}

module.exports = {
  isAuthenticated
}