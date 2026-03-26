import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  // 1. Ask the Brain for the list of friends
  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:5000/api/contacts');
    setContacts(res.data);
  };

  useEffect(() => { fetchContacts(); }, []);

  // 2. Save a new friend
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/contacts', formData);
    setFormData({ name: '', phone: '', email: '' }); // Clear the boxes
    fetchContacts(); // Refresh the list
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>My Contact Book 📖</h1>
      
      {/* The Form to add friends */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /><br/>
        <input placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required /><br/>
        <input placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required /><br/>
        <button type="submit">Save Contact</button>
      </form>

      {/* The List to see friends */}
      <h2>Saved Friends:</h2>
      <ul>
        {contacts.map(c => (
          <li key={c._id}>
            <strong>{c.name}</strong> - {c.phone} ({c.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;