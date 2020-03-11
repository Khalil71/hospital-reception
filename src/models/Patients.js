const mongoose = require('mongoose');
const uuid = require('uuid/v1');

mongoose.Promise = global.Promise;

let Patients = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuid
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Patients', Patients);
