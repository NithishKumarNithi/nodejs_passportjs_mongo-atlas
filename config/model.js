const mongoose = require('mongoose'),
      db = require('./db')(mongoose);

const registerSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
