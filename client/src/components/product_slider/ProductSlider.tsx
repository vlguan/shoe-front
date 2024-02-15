// ProductSlider.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.css'; // Create this CSS file for styling
import { Product } from '../../types';
const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const formattedProducts = products.map(product => {
    const imageFiles = BASE_URL + product.image_files.split(',')[0];
    return{
      name: product.name,
      price: product.price,
      image: imageFiles,
    }
  })
  var sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 30000,
    responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll:1
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll:3
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll:5
          },
        },
      ],
  };

  return (
    <div className="product-slider">
      <Slider {...sliderSettings} >
      {formattedProducts.map((product, index) => (
        <div key={index} className="slide">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default ProductSlider;
