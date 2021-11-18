const jwt = require('jsonwebtoken')
const { SECRET } = require('../env') // JWT secret (used to sign and verify token)

function isAuthenticated(req, res, next) { // authenticate whether the user has the token that we need,  token is in the header of the request, next() is the last step,
  try{
    const token = req.headers['auth-token']

  // TODO: verify the token against the , if success -> call next() otherwise throw 401 error
  // if success we take the result 

  // Sample:
  if (token) {
    const verified = jwt.verify(token, SECRET);
    req.user = verified
    next()
  } else {
    res.status(401).send('Unauthenticated no token')
  }

  } catch(error){
    return res.status(401).send('Unauthenticated wrong token')

  }
  
}

module.exports = {
  isAuthenticated
}