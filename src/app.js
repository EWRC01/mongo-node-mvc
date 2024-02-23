const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});