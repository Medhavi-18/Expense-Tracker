const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures unique username
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Use 'register' as the collection name
const User = mongoose.model('User', userSchema, 'register');

module.exports = User;
