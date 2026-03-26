const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. Middlewares (The "Rules")
app.use(express.json()); // Allows the robot to read JSON messages
app.use(cors());         // Allows the Frontend to talk to the Backend

// 2. Connect to Memory (Replace the link below with your MongoDB link!)
const MONGO_URI = "mongodb+srv://hammad1751be23_db_user:4hwQ3hfkAP7ISV9a@cluster0.vrov8fb.mongodb.net/ContactDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Memory!"))
  .catch((err) => console.log("❌ Oh no, Memory error:", err));

// 3. Define the "Contact Card" (The Schema)
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// 4. The "Talkers" (Routes/API)
// GET: Send all friends to the screen
app.get('/api/contacts', async (req, res) => {
    const allContacts = await Contact.find();
    res.json(allContacts);
});

// POST: Save a new friend to the memory
app.post('/api/contacts', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
});

// 5. Wake up the Robot
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Robot is awake and listening on port ${PORT}!`);
});