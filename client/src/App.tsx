// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from'./components/navbar/index.tsx';

import Gallery from './pages/Gallery.tsx'
import LandingPage from './pages/Landing.tsx'
import Footer from './components/footer/footer.tsx';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
const App: React.FC = () => {
  const photoData = [
    { photo: 'path/to/photo1.jpg', title: 'Photo 1', price: 20 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    { photo: 'path/to/photo2.jpg', title: 'Photo 2', price: 25 },
    

    // Add more photo data as needed
  ];
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/gallery' element={<Gallery data={photoData}/>}/>
          {/* <Route path='/' exact component={Home} /> */}
          {/* <Route path='/services' component={Services} /> */}
          {/* <Route path='/products' component={Products} /> */}
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
