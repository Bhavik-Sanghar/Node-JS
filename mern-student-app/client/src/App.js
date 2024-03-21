// src/App.js

import React, { useState } from 'react';


import axios from 'axios';

// Set base URL for axios requests
axios.defaults.baseURL = 'http://localhost:5000'; // Adjust port if necessary

// Now you can use axios for making requests
axios.post('/students', { /* student data */ })
  .then(response => {
    console.log('Student added:', response.data);
  })
  .catch(error => {
    console.error('Error adding student:', error);
  });


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/students', { name, email, phone });
      console.log('Student added:', response.data);
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
