import React from "react";
import Carouselcomp from '../components/carousel/index.tsx';
import ProductSlider from '../components/product_slider/ProductSlider.tsx';
import photo1 from '../assets/photo1.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
const LandingPage: React.FC = () => {
    const images = [
        photo1,
      photo2,
      photo3
      ];
      const products = [
        { name: 'Product 1', price: '20.99', image: 'product1.jpg' },
        { name: 'Product 2', price: '20.99', image: 'product1.jpg' },
        { name: 'Product 3', price: '20.99', image: 'product1.jpg' }
        // Add more products as needed
      ];
    return(
        <div className="App">
            <Carouselcomp images={images}/>
            <ProductSlider products={products}/>
        </div>
    
      )
}
export default LandingPage;