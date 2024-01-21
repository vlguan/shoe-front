import React, {useEffect,useState} from "react";
import { useParams } from 'react-router-dom'
import {Product} from '../../types';
import Carouselcomp from "../carousel/index.tsx";
import './itemDetail.css'
const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'

interface ProductSliderProps {
  products: Product[];
}

const ItemDetails: React.FC<ProductSliderProps> = () =>{
  const [ prods, setProducts] = useState<Product>();
  const { index } = useParams()
  useEffect(()=>{
    const fetchData = async() => {
      const response = await fetch(`http://localhost:8000/api/get-one-item/?item=${index}`, {
        method:'GET'
      });
      const data = await response.json();
      setProducts(data)
    }
    fetchData();
  },[]);
  const fileName = prods?.image_files.split(',')
  const urls = fileName?.map((file_name)=> BASE_URL + file_name);
  if (!prods) {
    return <div>Loading...</div>; // Or handle loading state accordingly
  }
  return (
    <div className="item-detail-container">
      <div className="left-column">
        <h2>{prods.name}</h2>
        <div className='carousel-container'>
          <Carouselcomp images={urls}/>
        </div>
      </div>
      <div className='right-column'>
        <div className='description-container'>
          <div className='price-size'>
            <p>Price: ${prods.price}</p>
            <p>Size: {prods.size}</p>
          </div>
          <p>Description: {prods.description}</p>
          
          {/* Add more details or styling as needed */}
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;