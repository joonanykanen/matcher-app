// src/components/Profile/ProfilePic.js, JN, 02.03.2024
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Snackbar, Alert, Button } from '@mui/material';
import { AppContext } from '../../context';

const ProfilePicture = ({ imageUrl }) => {
    const authToken = localStorage.getItem('auth_token');
    const [file, setFile] = useState(null);
    const { updateUser } = useContext(AppContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [messageType, setMessageType] = useState('success');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        uploadProfilePic(event.target.files[0]); // Upload directly after file selection
    };

    const uploadProfilePic = async (selectedFile) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', selectedFile || file);

            const response = await fetch('/api/users/uploadPic/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to upload profile picture');
            }

            const data = await response.json();
            updateUser(); // Update context or parent component to re-fetch user info
            setSnackbarMessage(data.message);
            setMessageType('success');
            setOpenSnackbar(true);
        } catch (error) {
            console.error(error);
            setSnackbarMessage('Error uploading profile picture');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="profilePicInput"
                accept="image/*"
            />
            <label htmlFor="profilePicInput">
                {imageUrl ? (
                    <img src={`/${imageUrl}`} alt="Profile" style={{ width: '10rem', height: '10rem', cursor: 'pointer', borderRadius: '50%' }} />
                ) : (
                    <FontAwesomeIcon icon={faUser} size="5x" style={{ width: '10rem', height: '10rem', cursor: 'pointer', borderRadius: '50%' }} />
                )}
            </label>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProfilePicture;

// eof
