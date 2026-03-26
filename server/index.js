const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Initialize the App
const app = express();
dotenv.config(); // This is the "glasses" that lets the code see your Render Environment Variables

// 2. Middlewares
app.use(express.json()); 
app.use(cors());         

// 3. Connect to MongoDB
// This line looks at Render's "Environment" tab first, then uses your link as a backup
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hammad1751be23_db_user:4hwQ3hfkAP7ISV9a@cluster0.vrov8fb.mongodb.net/ContactDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Memory!"))
  .catch((err) => console.log("❌ Oh no, Memory error:", err));

// 4. Define the Schema & Model
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// 5. Routes (The "Talkers")

// GET: Fetch all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const allContacts = await Contact.find();
        res.json(allContacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts" });
    }
});

// POST: Save a new contact
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ message: "Error saving contact" });
    }
});

// 6. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Robot is awake and listening on port ${PORT}!`);
});