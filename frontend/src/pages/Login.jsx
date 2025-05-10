import React, { useState } from 'react';
import axios from 'axios';
import { setTokens } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', credentials );
      setTokens(response.data);
      navigate('/');
    } catch (err) {
      alert('Login failed!');
    }
  };
//
  const navigatetosignup = () => {
    navigate("/signup");
  };


  return (
  <div className="login-container">
    <div className="form-wrapper">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        {/* Login Button */}
        <button type="submit">Login</button>
      </form>

      {/* Sign Up Redirect */}
      <div className="link-wrapper">
        <p>Don't have an account?</p>
        <button
          onClick={navigatetosignup}
          style={{
            background: 'none',
            color: 'blue',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

};

export default Login;
