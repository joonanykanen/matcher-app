// src/components/Profile/EditProfile.js, JN, 19.02.2024
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import ProfilePicUploader from './ProfilePicUploader';
import ProfilePic from './ProfilePic';

const EditProfile = () => {
  const authToken = localStorage.getItem('auth_token');
  const { user, updateUser } = useContext(AppContext);

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
      console.log(data);
      updateUser();
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
    
  };

  if (user) {
    return (
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <ProfilePic imageUrl={user.profilePic} />
            <label htmlFor="profilePic">Profile Picture</label>
            <ProfilePicUploader />
          </div>
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
            <select id="gender" name="gender" value={user.gender} onChange={handleChange}>
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
      </div>
    );
  }

};

export default EditProfile;

// eof
