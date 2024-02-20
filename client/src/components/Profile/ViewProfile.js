// src/components/Profile/ViewProfile.js, JN, 19.02.2024
import React, { useContext } from 'react';
import { AppContext } from '../../context';

const ViewProfile = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h2>View Profile</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Display more user profile information */}
      </div>
    </div>
  );
};

export default ViewProfile;

// eof
