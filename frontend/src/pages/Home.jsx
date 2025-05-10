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
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      {user ? <h1>Hello, {user.username}</h1> : <h1>Loading...</h1>}
      <button
        onClick={() => {
          clearTokens();
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
