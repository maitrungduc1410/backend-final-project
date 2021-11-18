const MessageModel = require('../models/message')

class MessageController {
  static async getAllMessages(req, res) { //done
    const allMessages = await MessageModel.find().populate("author") // return promise
    
    // TODO:
    // load all messages in DB using "find"
    // with each message we need to find who is it author using "find().populate('author')"
    // finally return array of messages
    return res.json(allMessages);
  }

  static async createNewMessage(req, res) { //done
    const { text } = req.body
    
    // TODO:
    // save message to database using "create" method of mongoose
    // after that call "populate('author')"
    // finally return the new message
    const message = await MessageModel.create({
      text: text,
      author: req.user._id
    })
    return res.json(message) // replace this json with real data
  }

  static async deleteMessage(req, res) {
    const {id} = req.params // chi la assign, not any execution here

     // TODO: remove item with id in database
    await MessageModel.findOneAndDelete({_id: id.trim()}) 
    return res.json({
      success: true
    })
  }
  
  static async updateMessage(req, res) {
    const { id } = req.params
    const { text } = req.body

    // TODO: update item in database and return UPDATED item after updating using "new: true"
    
   
    const newMessage = await MessageModel.findOneAndUpdate({_id: id}, { // wait for Update one to finish before returning 
      $set: {
        text: text
      }

    }, {
      new: true //return new value after updating
    }
    ).populate("author")
    return res.json(newMessage)
  }
}

module.exports = MessageController