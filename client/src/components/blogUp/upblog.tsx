import React, { useState } from 'react';
import axios from 'axios';
import CSRFToken from '../../actions/CSRFToken.js';
import Cookies from 'js-cookie';
import './upblog.css'; // Import the CSS file
import AdminNavBar from '../adminNav/adminNav.tsx';
const BlogUpload = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpload = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/blog/`,
        JSON.stringify({
          
          title,
          content,
          status,
        }),
        {
          withCredentials:true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
          },
        }
      );
      

      setSuccess(response.data.success);
      setError(null);
      // Optionally, you can reset the form fields here if needed.
    } catch (error) {
      setError(error.response.data.error || 'An error occurred');
      setSuccess(null);
    }
  };

  return (
    <div className="blog-upload-container">
      <AdminNavBar/>
      <CSRFToken/>
      <h2 className="upload-title">Blog Upload</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <label className="input-label">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <label className="input-label">Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-field-c"
      />
      <label className="input-label">Status:</label>
      <input
        type="number"
        value={status}
        onChange={(e) => setStatus(parseInt(e.target.value, 10))}
        className="input-field"
      />
      <button onClick={handleUpload} className="upload-button">
        Upload Blog
      </button>
    </div>
  );
};

export default BlogUpload;
