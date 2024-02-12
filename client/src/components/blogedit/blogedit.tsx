import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CSRFToken from '../../actions/CSRFToken';
import './blogedit.css'
interface EditBlogProps {}

const EditBlog: React.FC<EditBlogProps> = () => {
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');
  const { postId } = useParams<{ postId: string }>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing content of the blog post
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/?id=${postId}`, {
          withCredentials: true,
        });
        const existingTitle: string = response.data.title;
        const existingContent: string = response.data.content;
        setEditedTitle(existingTitle);
        setEditedContent(existingContent);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };
    fetchBlogPost();
  }, [postId]);

  const handleSave = async () => {
    try {
      // Update the blog post with the edited content
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/blog/?id=${postId}`,
        { title: editedTitle, content: editedContent }
      );
      navigate(`/blog`);
      // Redirect to the blog post page or update the state as needed
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      // Delete the blog post
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/blog/?id=${postId}`);
      navigate(`/blog`);
      // Redirect to the blog listing page or update the state as needed
    } catch (error) {
      console.error('Error deleting blog post:', error);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="textcontainer">
    <h1>Edit Blog Post</h1>
    <CSRFToken />
    <input
      type="text"
      className="title-input"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
      placeholder="Enter title..."
    />
    <textarea
      className="content-textarea"
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      rows={10}
      cols={50}
      placeholder="Enter content..."
    />
    <button onClick={handleSave}>Save Changes</button>
    <button onClick={handleDelete}>Delete</button>

    {showDeleteConfirmation && (
      <div className="confirmation">
        <p>Are you sure you want to delete this blog post?</p>
        <button onClick={confirmDelete}>Yes, Delete</button>
        <button onClick={cancelDelete}>Cancel</button>
      </div>
    )}
  </div>
);
};

export default EditBlog;
