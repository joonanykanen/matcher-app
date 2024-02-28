// src/components/Index.js, JN, 20.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import Button from '@mui/material/Button';
const Index = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      updateUser();
    }
  }, []);

  // Logged in user
  if (user) {
    return (
      <div>
        <h1>Welcome, {user.firstName} {user.lastName}!</h1>
        <p>This is the default index page component.</p>
      </div>
    );
  } else {
    // Not logged in
    return (
      <div>
        <h1>Welcome to Matcher!</h1>
        <p>Please start by signing in or signing up.</p>
        <Button variant="contained" color="primary">Sign in</Button>
        <Button variant="contained" color="secondary">Sign up</Button>
      </div>
    );
  }
};

export default Index;

// eof
