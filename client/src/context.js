// src/context.js, JN, 19.02.2024
import React, { createContext, useState } from 'react';

// Create a new context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  // Get the auth token from local storage
  const authToken = localStorage.getItem('auth_token');

  // Define state variables
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState([]);

  // Define functions to fetch user data
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
      return(data)
    }
  };

  // Define functions to update state
  const updateUser = async () => {
    await fetchUser().then(data => setUser(data));
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
  };

  const updateLikes = (newLikes) => {
    setLikes(newLikes);
  };

  // Define the context value
  const contextValue = {
    user,
    updateUser,
    messages,
    updateMessages,
    likes,
    updateLikes,
  };

  // Provide the context value to the components
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };

// eof
