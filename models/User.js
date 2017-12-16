const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const UserSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  }
});

mongoose.model('user', UserSchema);