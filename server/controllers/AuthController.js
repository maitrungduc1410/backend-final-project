const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../env') // JWT secret (used to sign and verify token)

class AuthController {


  static async login(req, res) {
    const { email, password } = req.body
    // TODO:
    // 1. find user with provided email in DB
    const user = await UserModel.findOne({email: email});
    if(!user) return res.status(400).send('email is not found');

    // 2. use bcrypt.compareSync to compare provided password and hashed password in DB
    const validPass = await bcrypt.compare(password, user.password);
    
    // 3. If failed -> return 401 with "Unauthenticated" message if (!validPass) return res.status(401).send('Unauthenticated');
    // 4. If success -> create new token using jwt.sign (note: sign token with user data as payload)
    const token = jwt.sign({_id: user._id}, SECRET);
    // 5. return the token below and the user
    return res.json({
      user: user, // return new user here instead of empty object
      token: token
    })
  }; // finish 

  static async register(req, res) {
    try{
      const { name, email, password } = req.body
    console.log('password', password);
 
    //TODO:
    
    // 1. hash password using bcrypt.hashSync
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // 2. save user to DB with UserModel.create with "await" to get newly created user
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword
    });
    // 3 create token
    const token = jwt.sign({_id: user._id}, SECRET);// id is just a random object, this is user's info, for easy use later on, but not required - best practice only
    // 4. return the token below and the user

    //5 then return the user and new token
    const savedUser = await user.save();
    
    return res.json(
      {
      user: savedUser, // return new user here instead of empty object
      token: token
    })
      
    } catch (error) {
      res.status(422).send(error.message) // neu chay console.log, chi hien ra o terminal, user won't see it. 400: bad request, 422: unprocessable entity (related to handling database)

    }
  }

  static async getCurrentUser(req, res) {
    return res.json(req.user)
  }
}

module.exports = AuthController