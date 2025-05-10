import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken, clearTokens } from '../auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAccessToken();
        const res = await axios.get('http://localhost:8000/api/user/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        clearTokens();
        navigate('/signup');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    clearTokens();
    navigate('/signup');
  };

  return (
    <div className="home-container">
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Home;
