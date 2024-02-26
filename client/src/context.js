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
  const [matches, setMatches] = useState([]);

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

  const fetchLikes = async () => {
    const response = await fetch('/api/likes/', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.log(response.text)
    } else {
      const data = await response.json();
      return(data.likes)
    }
  };

  const fetchMatches = async () => {
    const response = await fetch('/api/likes/matches', {
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
    let currentLikes = likes;

    if (!currentUser) {
        currentUser = await fetchUser();
        if (!currentUser) return; // Handle case where user fetch fails or returns null/undefined
        setUser(currentUser);
    }
    if (currentLikes.length === 0) {
        currentLikes = await fetchLikes();
        if (!currentLikes) return; // Handle case where likes fetch fails or returns null/undefined
        setLikes(currentLikes);
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

    // Filter out users that the current user has already liked/disliked
    const swipableUsers = filteredUsers.filter((u) => !currentLikes.includes(u._id));

    return(swipableUsers)
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

  const updateLikes = async () => {
    await fetchLikes().then(data => setLikes(data));
  };

  const updateMatches = async () => {
    await fetchMatches().then(data => setMatches(data));
  }

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
    matches,
    updateMatches
  };

  // Provide the context value to the components
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };

// eof
