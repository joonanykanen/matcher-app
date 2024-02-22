// src/components/Swipe/SwipeView.js, JN, 21.02.2024
import React, { useContext } from 'react';
import SwipeCard from './SwipeCard';
import { AppContext } from '../../context';

const SwipeView = () => {
  const { usersToSwipe } = useContext(AppContext);

  return (
    <div className="swipe-container">
      {usersToSwipe.map((user) => (
        <SwipeCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default SwipeView;

// eof
