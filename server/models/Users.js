const mongoose = require('mongoose')
// Define the schema for User
const UserSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true, // Ensures the category is provided
    },
    amount: {
      type: Number,
      required: true, // Ensures the amount is provided
    },
    createdAt: { type: Date, default: Date.now },
    
  updatedAt: { type: String, default: '-' },
    comments: {
      type: String,
      default: '', // Allows empty comments, if not provided
    },
  });
  

const UserModel = mongoose.model("users", UserSchema)
module.exports =UserModel