// src/components/Profile/ViewProfile.js, JN, 19.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context';
import { Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ViewProfile = () => {
  const { t } = useTranslation();
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
        <Typography variant="h5">{t('yourProfile')}</Typography>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px'
        }}>
          <Avatar src={`/${user.profilePic}`} alt="Profile" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
          <div>
            <Typography variant="body1" style={{ margin: '5px' }}><strong>{t('name')}:</strong> {user.firstName} {user.lastName}</Typography>
            <Typography variant="body1" style={{ margin: '5px' }}><strong>{t('email')}:</strong> {user.email}</Typography>
            <Typography variant="body1" style={{ margin: '5px' }}><strong>{t('age')}:</strong> {user.age}</Typography>
            <Typography variant="body1" style={{ margin: '5px' }}><strong>{t('gender')}:</strong> {user.gender}</Typography>
            {user.bio && <Typography variant="body1" style={{ margin: '5px' }}><strong>{t('bio')}: </strong> {user.bio}</Typography>}
          </div>
        </div>
      </div>
    );
  }
};

export default ViewProfile;


// eof
