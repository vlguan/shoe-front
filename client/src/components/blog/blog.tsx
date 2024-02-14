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
  image: string;
}

const BlogDisplay: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const[postsPerPage] =useState(10);

  const fetchPosts = async () => {
    if (!hasMorePosts || loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`, {
        withCredentials: true,
        params:{
          start:page*postsPerPage,
          end:(page+1)*postsPerPage
        }
        
      });

      const newPosts: Post[] = await response.data;
      setPosts((prevPosts)=>[...prevPosts,...newPosts]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  // Increment page after the initial fetch.
    if (page < 1) {
    fetchPosts(); // Always fetch posts when the component mounts or when page changes.
    setPage((prevPage) => prevPage + 1);
    }
  }, [page, loading]);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    fetchPosts()
  };

  return (
    <div className={styles.blogContainer}>
      <h1>Little Feet Blog</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <h3 className={styles.postDate}>by {post.author}</h3>
            <h3 className={styles.postDate}>{formatDate(post.updated_on)}</h3>
            {post.image && <img src={post.image} alt={`Image for ${post.title}`} />}
            <div className={styles.postDesc} dangerouslySetInnerHTML={{__html: `${post.content}`}}></div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {hasMorePosts && (
        <button onClick={handleNextPage} >
          More Posts
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(BlogDisplay);
