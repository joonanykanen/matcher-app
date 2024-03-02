// src/components/Swipe/SwipeView.js, JN, 21.02.2024
import React, { useContext, useEffect, useState } from 'react';
import SwipeCard from './SwipeCard';
import { AppContext } from '../../context';
import { Typography } from '@mui/material';

const SwipeView = () => {
  const authToken = localStorage.getItem('auth_token');
  const { usersToSwipe, updateUsersToSwipe } = useContext(AppContext);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    if (authToken) {
      updateUsersToSwipe();
    } else {
      // Redirect to login page
      // Consider redirecting from login page back here after successful login
      window.location.href = '/login';
    }
  }, []);

  const handleLike = (profile) => {
    console.log(`Liked profile: ${profile.firstName} ${profile.lastName}`);

    fetch(`/api/likes/${profile._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        type: 'like',
      }),
    }).then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error || 'Failed to like profile'); 
      }
    });
    // TODO: Add snack bar messages
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleDislike = (profile) => {
    console.log(`Disliked profile: ${profile.firstName} ${profile.lastName}`);

    fetch(`/api/likes/${profile._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        type: 'dislike',
      }),
    }).then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error || 'Failed to dislike profile'); 
      }
    });

    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  return (
    <div style={{ margin: "1rem" }}>
      {usersToSwipe.length > 0 && currentProfileIndex < usersToSwipe.length ? (
        <SwipeCard
          profile={usersToSwipe[currentProfileIndex]}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      ) : (
        <>
          <Typography variant="h4">No more profiles to swipe!🥴</Typography>
          <Typography variant="body1" sx={{ opacity: "80%", margin: "5px" }}>
            Consider <span style={{ color: "goldenrod" }}>Matcher Pro</span> for unlimited swipes!
          </Typography>
        </>
      )}
    </div>
  );
};

export default SwipeView;

// eof
