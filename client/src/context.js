// src/context.js, JN, 19.02.2024
import React, { createContext, useState } from 'react';

// Create a new context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  // Define state variables
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState([]);

  // Define functions to update state
  const updateUser = (userData) => {
    setUser(userData);
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
