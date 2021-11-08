class MessageController {
  static async getAllMessages(req, res) {
    // TODO:
    // load all messages in DB using "find"
    // with each message we need to find who is it author using "find().populate('author')"
    // finally return array of messages

    return res.json([])
  }

  static async createNewMessage(req, res) {
    const { text } = req.body
    
    // TODO:
    // save message to database using "create" method of mongoose
    // after that call "populate('author')"
    // finally return the new message
    
    return res.json({ // replace this json with real data
      _id: 1,
      text,
      author: {
        _id: 1,
        name: 'test'
      }
    })
  }

  static async deleteMessage(req, res) {
    const { id } = req.params

    // TODO: remove item with id in database
    
    return res.json({
      success: true
    })
  }
  
  static async updateMessage(req, res) {
    const { id } = req.params
    const { text } = req.body

    // TODO: update item in database and return UPDATED item after updating using "upsert: true"

    return res.json({
      _id: id,
      text,
      author: {
        _id: 1,
        name: 'text'
      }
    })
  }
}

module.exports = MessageController