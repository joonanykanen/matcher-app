// src/components/Profile/ProfilePicUploader.js, JN, 28.02.2024
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context';
import { Snackbar, Alert } from '@mui/material';

function ProfilePicUploader() {
  const authToken = localStorage.getItem('auth_token');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const { updateUser } = useContext(AppContext);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePic', file);

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
      updateUser();
      setMessage(data.message);
      setSnackbarMessage(data.message); // Set Snackbar message
      setMessageType('success'); // Set Snackbar message type
      setOpenSnackbar(true); // Open Snackbar
    } catch (error) {
      console.error(error);
      setMessage('Error uploading profile picture');
      setSnackbarMessage('Error uploading profile picture'); // Set Snackbar message
      setMessageType('error'); // Set Snackbar message type
      setOpenSnackbar(true); // Open Snackbar
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadProfilePic}>Upload</button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProfilePicUploader;

// eof
