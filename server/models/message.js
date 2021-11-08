const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: String,
  author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const MessageModel = mongoose.model('Message', messageSchema );
module.exports = MessageModel