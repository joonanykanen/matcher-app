// src/components/Profile/ViewProfile.js, JN, 19.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material/';

const ViewProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      updateUser();
    } else {
      window.location.href = '/login';
    }
  }, []);


  if (user) {
    return (
      <div style={{ margin: '20px' }}>
      <Typography variant="h5">Your Profile</Typography>
      <div style={{ 
        display: 'flex', // Enable flex container
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'center', // Align items horizontally in the center
        margin: '10px'
      }}>
        <Avatar src={`/${user.profilePic}`} alt="Profile" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
        <div>
        <Typography variant="body1" style={{ margin: '5px' }}><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
        <Typography variant="body1" style={{ margin: '5px' }}><strong>Email:</strong> {user.email}</Typography>
        {user.bio && <Typography variant="body1" style={{ margin: '5px' }}><strong>Bio: </strong> {user.bio}</Typography>}
        </div>
      </div>
      </div>
    );
  }
};

export default ViewProfile;

// eof
