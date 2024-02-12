import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './blog.module.css';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  updated_on: string;
}

const InfiniteScrollBlog: React.FC = ({ isAuthenticated }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const[postsPerPage] =useState(10);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!hasMorePosts || loading) {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`, {
          withCredentials: true,
          params: {
            start: (page-1)*postsPerPage,
            end: page*postsPerPage
          },
        });

        const newPosts: Post[] = await response.data;
        if (newPosts.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, hasMorePosts, loading]);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleEdit = (postId: number) => {
    navigate(`/edit-blog/${postId}`);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.blogContainer}>
      <h1>Infinite Scroll Blog</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <h3 className={styles.postDate}>{formatDate(post.updated_on)}</h3>
            <p className={styles.postDesc}>{post.content}</p>

            {isAuthenticated && (
              <button onClick={() => handleEdit(post.id)}>Edit</button>
            )}
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {hasMorePosts && (
        <button onClick={handleNextPage} disabled={loading}>
          Next Page
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(InfiniteScrollBlog);
