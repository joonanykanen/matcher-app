// src/components/Swipe/SwipeView.js, JN, 21.02.2024
import React, { useContext, useEffect, useState } from 'react';
import SwipeCard from './SwipeCard';
import { AppContext } from '../../context';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const SwipeView = () => {
  const authToken = localStorage.getItem('auth_token');
  const { usersToSwipe, updateUsersToSwipe } = useContext(AppContext);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [lastLikedProfile, setLastLikedProfile] = useState(null);
  const [isMatch, setIsMatch] = useState(false);
  const [swipingStyle, setSwipingStyle] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    if (authToken) {
      updateUsersToSwipe();
    } else {
      // Redirect to login page
      // Consider redirecting from login page back here after successful login
      window.location.href = '/login';
    }
  }, []);

  const checkForMatch = (profileId) => {
    fetch(`/api/likes/${profileId}/check-match`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if(data.matched) {
        console.log("It's a match!");
        setIsMatch(true); // Show the modal when there's a match
      }
    })
    .catch(error => console.error("Error checking for a match: ", error));
  };

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
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error || 'Failed to like profile'); 
      }
      // Save the last liked profile for displaying in the match modal
      setLastLikedProfile(profile);
      // After liking the profile, check for a match
      checkForMatch(profile._id);
    })
    .catch(error => console.error("Error liking the profile: ", error));
    
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

  const handleStartChat = () => {
    // Navigate to the chat page with the ID of the matched profile
    navigate(`/chat/${lastLikedProfile._id}`);
    setIsMatch(false); // Close the match dialog
  };

  // Define swipe handlers
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const rotation = eventData.deltaX * 0.1; // Adjust for desired rotation
      setSwipingStyle({
        transform: `translateX(${eventData.deltaX}px) rotate(${rotation}deg)`,
        transition: 'none',
      });
    },
    onSwiped: () => {
      setSwipingStyle({}); // Reset style after swiping
    },
    onSwipedLeft: () => handleDislike(usersToSwipe[currentProfileIndex]),
    onSwipedRight: () => handleLike(usersToSwipe[currentProfileIndex]),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div style={{ margin: "1rem" }}>
      {usersToSwipe.length > 0 && currentProfileIndex < usersToSwipe.length ? (
        <div {...handlers} style={{ ...swipingStyle, margin: "0 auto", maxWidth: "300px" }} >
          <SwipeCard
            profile={usersToSwipe[currentProfileIndex]}
            handleLike={() => handleLike(usersToSwipe[currentProfileIndex])}
            handleDislike={() => handleDislike(usersToSwipe[currentProfileIndex])}
          />
        </div>
      ) : (
        <>
          <Typography variant="h4">{t('noMoreProfiles')}</Typography>
          <Typography variant="body1" sx={{ opacity: "80%", margin: "5px" }}>
            {t("consider")} <span style={{ color: "goldenrod" }}>Matcher Pro</span>{t("forUnlimitedSwipes")}
          </Typography>
        </>
      )}
      <Dialog open={isMatch} onClose={() => setIsMatch(false)}>
        <DialogTitle>{t("newMatch")}</DialogTitle>
        <DialogContent>
          <Typography>
            {lastLikedProfile ? 
              t("youAndOtherLiked", { firstName: lastLikedProfile.firstName, lastName: lastLikedProfile.lastName }) : 
              t("youGotNewMatch") // Fallback text in case `lastLikedProfile` is null for some reason
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStartChat}>{t("startChat")}</Button>
          <Button onClick={() => setIsMatch(false)}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );  
};

export default SwipeView;


// eof
