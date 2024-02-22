import React, { useState, useContext } from 'react';
import { AppContext } from '../../context';

function ProfilePicUploader() {
  const authToken = localStorage.getItem('auth_token');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { updateUser } = useContext(AppContext);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    } catch (error) {
      console.error(error);
      setMessage('Error uploading profile picture');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadProfilePic}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfilePicUploader;
