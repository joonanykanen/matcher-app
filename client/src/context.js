// src/context.js, JN, 19.02.2024
import React, { createContext, useState, useEffect } from 'react';

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

  // Add darkMode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // default to false
  });

  // Effect to update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
      return(data.matches)
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

  const fetchMessages = async () => {
    const response = await fetch("/api/messages/", {
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

  const updateUsersToSwipe = async () => {
    await fetchUsersToSwipe().then(data => setUsersToSwipe(data));
  };

  const updateMessages = async () => {
    await fetchMessages().then(data => setMessages(data));
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
    updateMatches,
    darkMode,
    toggleDarkMode,
  };

  // Provide the context value to the components
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };

// eof
