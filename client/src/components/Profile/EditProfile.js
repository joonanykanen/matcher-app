// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { Alert, TextField, Button, Snackbar, Typography, MenuItem, CircularProgress } from '@mui/material/';
import ProfilePic from './ProfilePic';

const EditProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (authToken) {
      updateUser()
        .then(() => setLoading(false)) // Once user is fetched, setLoading to false
        .catch(error => console.error("Failed to fetch user data:", error));
    } else {
      // Redirect to login page
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate changes
    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== originalData[key]) { // Check if there are changes
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    // Update user profile with changes only
    fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(changes)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error || 'Failed to update profile');
      }
      updateUser();
      setSnackbarMessage('Profile updated successfully!');
      setMessageType('success');
      setOpenSnackbar(true);
    })
    .catch(error => {
      setSnackbarMessage(`Failed to update profile: ${error.message}. Please try again.`);
      setMessageType('error');
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) { // Display loading spinner until user is fetched
    return <CircularProgress />;
  }

  if (user) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h5">Edit Profile</Typography>
          <div style={{ margin: '20px' }}>
            <div sx={{ margin: "20px" }}>
              <ProfilePic imageUrl={user.profilePic} />
            </div>
          </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="email"
              name="email"
              label="Email"
              placeholder={user.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
          <TextField
            id="gender"
            name="gender"
            label="Gender"
            select
            value={formData.gender || ''} // Updated to use formData.gender
            onChange={handleChange}  
            sx={{minWidth: '220px'}}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="bio"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              placeholder={user.bio || "Enter your bio"}
              onChange={handleChange}
              sx={{minWidth: '220px'}}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
  return null; // Return null if user is not found
};

export default EditProfile;

// eof
