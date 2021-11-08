const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = require('./routes/message')
const routes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

const mongoose = require('mongoose');

// TODO: replace connection string below
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/', routes)

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});