import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    repassword: '',
  });

  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/signup/', formData);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {['username', 'first_name', 'last_name', 'password', 'repassword'].map(field => (
        <div key={field}>
          <input
            type={field.includes('password') ? 'password' : 'text'}
            name={field}
            placeholder={field}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default Signup;
