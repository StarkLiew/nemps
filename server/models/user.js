const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
  /*name: { type: String, required: true },
  companyName: String,
  country: String,
  businessType: String,
  role: {
    type: String,
    enum: ['Cashier', 'Manager', 'Admin'],
    default: 'Admin'
  }*/
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
