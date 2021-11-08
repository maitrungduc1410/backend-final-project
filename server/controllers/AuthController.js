const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../env') // JWT secret (used to sign and verify token)

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body

    // TODO:
    // 1. find user with provided email in DB
    // 2. use bcrypt.compareSync to compare provided password and hashed password in DB
    // 3. If failed -> return 401 with "Unauthenticated" message
    // 4. If success -> create new token using jwt.sign (note: sign token with user data as payload)
    // 5. return the token below and the user

    return res.json({
      user: {}, // return new user here instead of empty object
      token: 'replace_token_here'
    })
  }

  static async register(req, res) {
    const { name, email, password } = req.body
    

    //TODO:
    // 1. hash password using bcrypt.hashSync
    // 2. save user to DB with UserModel.create with "await" to get newly created user
    // then return the user and new token

    return {
      user: {}, // return new user here instead of empty object
      token: 'replace token here'
    }
  }

  static async getCurrentUser(req, res) {
    return res.json(req.user)
  }
}

module.exports = AuthController