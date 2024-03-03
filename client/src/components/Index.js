// src/components/Index.js, JN, 20.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  useEffect(() => {
    if (authToken) {
      updateUser();
    }
  }, []);

  // Logged in user
  if (user) {
    return (
      <div style={{ margin: "2rem" }}>
        <Typography variant="h2" sx={{ margin: "1rem" }}>{t('welcomeLoggedIn', { firstName: user.firstName, lastName: user.lastName })}</Typography>
        <Typography variant="body1">{t('startSwiping')}</Typography>
      </div>
    );
  } else {
    // Not logged in
    return (
      <div style={{ margin: "2rem" }}>
        <Typography variant="h2">{t('welcome')}</Typography>
        <Typography variant="body1" sx={{ margin: "1rem" }}>{t('pleaseRegister')}</Typography>
      </div>
    );
  }
};

export default Index;


// eof
