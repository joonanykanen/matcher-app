// src/components/Index.js, JN, 20.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context';

const Index = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  const fetchUser = async () => {
    const response = await fetch('/api/users/me', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.log(response.text)
    } else {
      const data = await response.json();
      updateUser(data);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUser();
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
        <p>This is the default index page component.</p>
        {/* Add Sign in and Sign up buttons here */}
      </div>
    );
  }
};

export default Index;

// eof
