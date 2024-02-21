// src/components/Profile/ViewProfile.js, JN, 19.02.2024
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context';

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
      <div>
        <h2>View Profile</h2>
        <div>
          <p><strong>Name:</strong> {user.firstName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Display more user profile information */}
        </div>
      </div>
    );
  }
};

export default ViewProfile;

// eof
