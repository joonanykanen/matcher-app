// src/components/Swipe/SwipeCard.js, JN, 21.02.2024
import React from 'react';

const SwipeCard = ({ user }) => {
  return (
    <div className="card">
      <img src={user.profilePic} alt={user.firstName} />
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default SwipeCard;

// eof
