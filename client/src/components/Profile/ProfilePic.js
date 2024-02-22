import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const ProfilePicture = ({ imageUrl }) => {
    return (
        imageUrl ? (
                <img src={`/${imageUrl}`} alt="Profile" style={{ width: '10rem', height: '10rem' }} />
            ) : (
                <FontAwesomeIcon icon={faUser} size="5x" style={{ width: '10rem', height: '10rem' }} />
            )
    );
};

export default ProfilePicture;
