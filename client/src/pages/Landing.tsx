import React from "react";
import Carouselcomp from '../components/carousel/index.tsx';
import ProductSlider from '../components/product_slider/ProductSlider.tsx';
const LandingPage: React.FC = () => {
    const images = [
        "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
      "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
      "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
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