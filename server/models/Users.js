const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true, 
    },
    amount: {
      type: Number,
      required: true, 
    },
    createdAt: {
       type: Date, 
       default: Date.now
       },
    
  updatedAt: { 
    type: String,
     default: '-'
     },
    comments: {
      type: String,
      default: '', 
    },
  });
  

const UserModel = mongoose.model("users", UserSchema)
module.exports =UserModel