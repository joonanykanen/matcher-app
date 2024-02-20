// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context';

const EditProfile = () => {
  const { user, updateUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile
    // Example API call or function to update user profile
    // updateUser(formData);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
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
};

export default EditProfile;

// eof
