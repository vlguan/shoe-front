// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from'./components/navbar/index.tsx';
import Blog from './pages/Blog.tsx'
import Gallery from './pages/Gallery.tsx'
import LandingPage from './pages/Landing.tsx'
import Admin from './pages/Admin.tsx'
import Footer from './components/footer/footer.tsx';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import ItemDetails from './components/itemDetail/itemDetail.tsx';
const App: React.FC = () => {
  const products=[]
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/gallery' element={<Gallery products={products}/>}/>
          <Route path='/item/:index' element={<ItemDetails/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/admin' element={<Admin/>} />
          {/* <Route path='/contact-us' component={ContactUs} /> */}
          {/* <Route path='/sign-up' component={SignUp} /> */}
          {/* <Route path='/marketing' component={Marketing} /> */}
          {/* <Route path='/consulting' component={Consulting} /> */}
        </Routes>

      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
