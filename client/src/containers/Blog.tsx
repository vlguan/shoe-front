import React from 'react';
import './blog.css'
// import CSVUpload from '../components/csvUpload/csv.tsx';
import InfiniteScrollBlog from '../components/blog/blog.tsx';
const Blog = () => {
  return (
    <div className='blog'>
        <InfiniteScrollBlog/>
    </div>
  );
};

export default Blog;
