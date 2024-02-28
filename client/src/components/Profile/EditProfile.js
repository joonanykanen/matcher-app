// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import ProfilePicUploader from './ProfilePicUploader';
import ProfilePic from './ProfilePic';
import { Alert, Snackbar } from '@mui/material/';

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
      <div>
        <h2>Edit Profile</h2>
          <div>
            <ProfilePic imageUrl={user.profilePic} />
            <label htmlFor="profilePic">Profile Picture</label>
            <ProfilePicUploader />
          </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder={user.firstName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder={user.lastName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder={user.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" placeholder={user.age || "Enter your age"} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" placeholder={user.bio || "Enter your bio"} onChange={handleChange}></textarea>
          </div>
          {/* Add more fields for editing profile */}
          <button type="submit">Save Changes</button>
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
