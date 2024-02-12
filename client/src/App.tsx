// import logo from './logo.svg';
import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Navbar from'./components/navbar/index.tsx';
import Blog from './containers/Blog.tsx'
import Gallery from './containers/Gallery.tsx'
import LandingPage from './containers/Landing.tsx'
import Admin from './containers/Admin.tsx'
import Login from './components/login/login.tsx';
import Footer from './components/footer/footer.tsx';
import ItemDetails from './components/itemDetail/itemDetail.tsx';
import Register from './components/register/register.tsx'
import { BrowserRouter, Outlet, Route,Routes} from 'react-router-dom';
import ItemUpload from './components/itemupload/itemup.tsx';
import { Provider } from 'react-redux';
import Layout from './hocs/Layout.js';
import store from './store.ts';
import BlogUpload from './components/blogUp/upblog.tsx';
import EditBlog from './components/blogedit/blogedit.tsx';
import ItemList from './components/editComp/itemedit.tsx'
const App: React.FC = () => {
  return (
  <>
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        <Fragment>
          <Layout>
            <Navbar/>
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/gallery' element={<Gallery/>}/>
              <Route path='/item/:index' element={<ItemDetails/>} />
              <Route path='/blog' element={<Blog/>} />
              <Route path='/login' element={<Login/>} />
              <Route path="/edit-blog/:postId" element={<EditBlog />} />
              <Route path='/admin' element={<Admin/>}>
                <Route path='item-upload' element={<ItemUpload/>}/>
                <Route path='blog-upload' element={<BlogUpload/>}/>
                <Route path='item-edit' element={<ItemList/>}/>
              </Route>
              <Route path='/register' element={<Register/>} />
              {/* <Route path='/marketing' component={Marketing} /> */}
              {/* <Route path='/consulting' component={Consulting} /> */}
            </Routes>
          </Layout>
          </Fragment>

        </BrowserRouter>
      </Provider>
    </div>
    <Footer/>
    </>
  );
}

export default App;
