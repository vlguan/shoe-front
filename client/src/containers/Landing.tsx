import React, { useEffect, useState } from "react";
import Carouselcomp from '../components/carousel/index.tsx';
import ProductSlider from '../components/product_slider/ProductSlider.tsx';
import {fetchImage, fetchProduct} from '../actions/apiUtil.ts';
import axios from "axios";
import './slider.css'
const LandingPage: React.FC = () => {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [whowe, setWhoWe] =useState([]);
  useEffect(() => {
    const fetchData = async()=>{
      const imagePaths = await fetchImage();
      console.log(imagePaths)
      setImages(imagePaths);
      const productData = await axios.get(`${process.env.REACT_APP_API_URL}/api/featured/`, {withCredentials:true});
      // console.log(productData)
      setProducts(productData.data);
      const whoWe = await axios.get(`${process.env.REACT_APP_API_URL}/api/who/`, {withCredentials:true});
      setWhoWe(whoWe.data);
    }
    fetchData();
  }, []);
  let we = {__html:`${whowe}`}
    return(
        <div className="App">
            <Carouselcomp images={images}/>
            <h3>Featured Products</h3>
            <div className='slider'>
              <ProductSlider products={products}/>
            </div>
            <h3>
              Who Are We?
            </h3>
            <div dangerouslySetInnerHTML={we} />
        </div>
    
      )
}
export default LandingPage;