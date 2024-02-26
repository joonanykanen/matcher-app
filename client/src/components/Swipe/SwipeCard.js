// src/components/Swipe/SwipeCard.js, JN, 21.02.2024
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import ProfilePic from '../Profile/ProfilePic';

const SwipeCard = ({ profile, handleLike, handleDislike }) => {
  return (
    <Card>
      <CardContent>
        <ProfilePic imageUrl={profile.profilePic} />
        <Typography variant="h5">{profile.firstName} {profile.lastName}, {profile.age}</Typography>
        <Typography variant="body1">{profile.bio ?? 'No bio available'}</Typography>
        <Button variant="contained" color="primary" onClick={() => handleLike(profile)}>Like</Button>
        <Button variant="contained" color="secondary" onClick={() => handleDislike(profile)}>Dislike</Button>
      </CardContent>
    </Card>
  );
};

export default SwipeCard;

// eof
