// src/components/Profile/ViewProfile.js, JN, 19.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context';
import { Typography } from '@mui/material';
import ProfilePic from './ProfilePic';

const ViewProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      updateUser();
    } else {
      // Redirect to login page
      // Consider redirecting from login page back here after successful login
      window.location.href = '/login';
    }
  }, []);


  if (user) {
    return (
      <div style={{ margin: '20px' }}>
        <Typography variant="h5">Your Profile</Typography>
        <div style={{ margin: '10px' }}>
          <ProfilePic imageUrl={user.profilePic} />
          <Typography variant="body1" style={{ margin: '5px' }}><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
          <Typography variant="body1" style={{ margin: '5px' }}><strong>Email:</strong> {user.email}</Typography>
          {user.bio && <Typography variant="body1" style={{ margin: '5px' }}><strong>Bio: </strong> {user.bio}</Typography>}
          {/* Display more user profile information */}
        </div>
      </div>
    );
  }
};

export default ViewProfile;

// eof
