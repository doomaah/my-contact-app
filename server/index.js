const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// EMERGENCY MEMORY (This replaces the Database for your submission)
let contacts = [
    { name: "Test Friend", phone: "123-456", email: "test@gmail.com" }
];

// GET: Send the list to the screen
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});

// POST: Save a new friend to memory
app.post('/api/contacts', (req, res) => {
    const newContact = req.body;
    contacts.push(newContact);
    res.status(201).json(newContact);
});

// Wake up the Robot
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 EMERGENCY MODE: Robot is awake on port ${PORT}!`);
});