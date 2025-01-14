const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const bcrypt = require('bcryptjs');
const User = require('./models/SignupLogin')
const jwt = require('jsonwebtoken'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/expansetracker");


// JWT Secret
const JWT_SECRET = "Medhavi"; // Store this securely in an environment variable



app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use." });
      }
  
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user with hashed password
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save user to the database
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: "Server error" });
    }
  });
  




//Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    console.log('Received credentials:', { username, password });

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Case-insensitive query for username
        const user = await User.findOne({
            username: new RegExp('^' + username.trim() + '$', 'i')
        });

        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        // Return token and user details
        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});







//-----------------------------------------------------------------------
// Create new user
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Get all users (for the frontend)
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Get user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id) // Corrected here
        .then(user => res.json(user)) // Return a single user
        .catch(err => res.json(err));
});

// Update user route (if needed)
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});



//delete
app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})




app.listen(3001, () => {
    console.log("Server is Running");
});
