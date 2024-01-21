import React, { useEffect, useState } from "react";
import Carouselcomp from '../components/carousel/index.tsx';
import ProductSlider from '../components/product_slider/ProductSlider.tsx';
import {fetchImage, fetchProduct} from '../components/apiUtil.tsx';
import './slider.css'
const LandingPage: React.FC = () => {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async()=>{
      const imagePaths = await fetchImage();
      setImages(imagePaths);
      const productData = await fetchProduct();
      // console.log(productData)
      setProducts(productData);
    }
    fetchData();
  }, []);
    return(
        <div className="App">
            <Carouselcomp images={images}/>
            <div className='slider'>
              <ProductSlider products={products}/>
            </div>
              
        </div>
    
      )
}
export default LandingPage;