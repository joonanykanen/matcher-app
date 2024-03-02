// src/components/Swipe/SwipeCard.js, JN, 21.02.2024
import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';

const SwipeCard = ({ profile, handleLike, handleDislike }) => {
  return (
    <Card sx={{
      maxWidth: 345,
      margin: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    }}>
      <CardContent>
        <Avatar src={`/${profile.profilePic}`} alt="Profile" sx={{ 
          width: 160, // Adjust these values as needed
          height: 160,
          mb: 2,
        }} />
        <Typography gutterBottom variant="h5" align="center">{profile.firstName} {profile.lastName}, {profile.age}</Typography>
        <Typography variant="body2" color="textSecondary" align="center">{profile.bio ?? 'No bio available'}</Typography>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          mt: 2,
        }}>
          <Button variant="contained" color="primary" onClick={() => handleLike(profile)}>Like</Button>
          <Button variant="contained" color="secondary" onClick={() => handleDislike(profile)}>Dislike</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SwipeCard;

// eof
