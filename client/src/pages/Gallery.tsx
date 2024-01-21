// PhotoGrid.js
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './PhotoGrid.css'; // Import your styles
import Filter from '../components/filter/filter.tsx';
import { fetchProduct } from '../components/apiUtil.tsx';
import {Product} from '../types.ts';
const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'

interface PhotoGridProps{
  products: Product[];
}
const PhotoGrid: React.FC<PhotoGridProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ prods, setProducts] = useState<Product[]>([]);
  const formattedProducts = prods.map(product => {
    const imageFiles = BASE_URL + product.image_files.split(',')[0];
    const shoeSize = product.size.charAt(product.size.length - 1);
    return{
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageFiles,
      size: shoeSize
    }
  })
  useEffect(() => {
    const fetchData = async()=>{
      const productData = await fetchProduct();
      // console.log(productData)
      setProducts(productData);
    }
    fetchData();
  }, []);
  // Extract unique categories from data
  const categories = Array.from(new Set(formattedProducts.map((item) => item.size)));

    const filteredData =
    selectedCategory === 'all'
      ? formattedProducts
      : formattedProducts.filter((item) => item.size === selectedCategory);

  return (
    <div>
        <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        />
    <div className="photo-grid">
        {filteredData.map((item, index) => (
            <Link to={`/item/${item.id}`} key={index} className="grid-item-link">
          <div key={index} className="grid-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
          </Link>
        ))}
    </div>
    </div>
  );
}

export default PhotoGrid;