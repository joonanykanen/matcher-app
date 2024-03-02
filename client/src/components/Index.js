// src/components/Index.js, JN, 20.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { Typography } from '@mui/material';
// import Button from '@mui/material/Button';
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
      <div style={{ margin: "2rem" }}>
        <Typography variant="h2" sx={{ margin: "1rem" }}>Welcome, {user.firstName} {user.lastName}!🔥</Typography>
        <Typography variant="body1">You can start by swiping profiles!</Typography>
      </div>
    );
  } else {
    // Not logged in
    return (
      <div style={{ margin: "2rem" }}>
        <Typography variant="h2">Welcome to Matcher!🔥</Typography>
        <Typography variant="body1" sx={{ margin: "1rem" }}>Please begin by registering or logging in.</Typography>
        {/* <Button variant="contained" color="primary">Sign in</Button>
        <Button variant="contained" color="secondary">Sign up</Button> */}
      </div>
    );
  }
};

export default Index;

// eof
