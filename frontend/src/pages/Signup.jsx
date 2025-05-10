import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email:'',
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
//#endregion
 const navigatetoLogin = () => {
    navigate("/login");
  };

  return (
  <div className="signup-container">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      {/* Username */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      {/* First Name */}
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />

      {/* Last Name */}
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* Confirm Password */}
      <input
        type="password"
        name="repassword"
        placeholder="Confirm Password"
        value={formData.repassword}
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit">Sign Up</button>
    </form>

    {/* Login Redirect */}
    <p>
      Already have an account?{' '}
      <button onClick={navigatetoLogin} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
        Login
      </button>
    </p>
  </div>
)
};


export default Signup;
