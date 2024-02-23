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
  const [usersToSwipe, setUsersToSwipe] = useState([]);

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

  const fetchUsersToSwipe = async () => {
    let currentUser = user;
    if (!currentUser) {
        currentUser = await fetchUser();
        if (!currentUser) return; // Handle case where user fetch fails or returns null/undefined
        setUser(currentUser);
    }

    const response = await fetch('/api/users/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.log(response.text)
    } 
    
    const data = await response.json();

    // Remove the current logged in user from the list of users to swipe
    const filteredUsers = data.filter((u) => u._id !== currentUser._id);

    return(filteredUsers)
  };

  // Define functions to update state
  const updateUser = async () => {
    await fetchUser().then(data => setUser(data));
  };

  const updateUsersToSwipe = async () => {
    await fetchUsersToSwipe().then(data => setUsersToSwipe(data));
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
    usersToSwipe,
    updateUsersToSwipe,
  };

  // Provide the context value to the components
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };

// eof
