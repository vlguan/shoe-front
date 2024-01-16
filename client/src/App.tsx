// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from'./components/navbar/index.tsx';

import Gallery from './pages/GalleryList.tsx'
import LandingPage from './pages/Landing.tsx'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
const App: React.FC = () => {
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          {/* <Route path='/' exact component={Home} /> */}
          {/* <Route path='/services' component={Services} /> */}
          {/* <Route path='/products' component={Products} /> */}
          {/* <Route path='/contact-us' component={ContactUs} /> */}
          {/* <Route path='/sign-up' component={SignUp} /> */}
          {/* <Route path='/marketing' component={Marketing} /> */}
          {/* <Route path='/consulting' component={Consulting} /> */}
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
