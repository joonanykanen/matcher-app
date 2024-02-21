// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';

const EditProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
    // Update user profile
    // Example API call or function to update user profile
    // updateUser(formData);
  };

  if (user && formData) {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          {/* Add more fields for editing profile */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }

};

export default EditProfile;

// eof
