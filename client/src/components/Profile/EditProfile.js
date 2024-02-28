// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { Alert, TextField, Button, Select, MenuItem, Snackbar, Typography, InputLabel } from '@mui/material/';
import ProfilePicUploader from './ProfilePicUploader';
import ProfilePic from './ProfilePic';

const EditProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    bio: user?.bio || ""
    // Add more fields as needed
  });

  useEffect(() => {
    if (authToken) {
      updateUser();
      // Set form data to real user data
      setFormData(user)
    } else {
      // Redirect to login page
      // Consider redirecting from login page back here after successful login
      window.location.href = '/login';
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Update user profile
    fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error || 'Failed to update profile'); 
      }

      console.log(data);
      updateUser();
      // Setup success message and type
      setSnackbarMessage('Profile updated successfully!');
      setMessageType('success');
      setOpenSnackbar(true);
    })
    .catch(error => {
      console.error(error);
      // Setup failure message and type
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


  if (user) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h5">Edit Profile</Typography>
          <div style={{ marginBottom: '20px' }}>
            <ProfilePic imageUrl={user.profilePic} />
            <ProfilePicUploader />
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
              id="age"
              name="age"
              label="Age"
              type="number"
              placeholder={user.age || "Enter your age"}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                id="gender"
                name="gender"
                labelId="gender-label"
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </div>
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
            />
          </div>
          {/* Add more fields for editing profile */}
          <Button type="submit" variant="contained">Save Changes</Button>
        </form>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }

};

export default EditProfile;

// eof
