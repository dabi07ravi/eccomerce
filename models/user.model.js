const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },

  lastname: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique : true
  },

  phone: {
    type: String,
    require: true,
    unique : true
  },

  password : {
    type: String,
    require: true,
  },

  role : {
    type: String,
    default : 'user',
  },

  isBlocked : {
    type: Boolean,
    default : false
  },

  passwordResetToken : {
    type: String,
  }

  
}, {timestamps : true});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatch = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
