const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Invalid Email'
      ],
      validate: {
        validator(email) {
          return new Promise((resolve, reject) => {
            User.findOne({ email }).then(user => (user ? resolve(false) : resolve(true)))
          })
        },
        message: 'Email is already taken'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password minimal characters is 6']
    },
    phoneNumber: {
      type: String,
      default: ''
      // maxlength: [12, 'Phone Number maximal characters is 12'],
      // minlength: [10, 'Phone Number Minimal characters is 10']
    },
    address: {
      type: String,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)
module.exports = User
