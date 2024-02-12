// PhotoGrid.js
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './PhotoGrid.css'; // Import your styles
import Filter from '../components/filter/filter.tsx';
import { fetchProduct } from '../actions/apiUtil.ts';
import axios from 'axios';
import {Product} from '../types.ts';
const BASE_URL = 'https://little-feet.s3.us-west-1.amazonaws.com/product/'
const ITEMS_PER_PAGE = 25;

const PhotoGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ prods, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage]=useState(1);
  const formattedProducts = prods.map(product => {
    const imageFiles = BASE_URL + product.image_files.split(',')[0];
    const model = product.model
    return{
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageFiles,
      model: model
    }
  })
  useEffect(() => {
    const fetchData = async()=>{
      const productData = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_all`);
      // console.log(productData)
      setProducts(productData.data);
    }
    fetchData();
  }, []);
  // Extract unique categories from data
  const categories = Array.from(new Set(formattedProducts.map((item) => item.model)));

  const filteredData =
  selectedCategory === 'all'
    ? formattedProducts
    : formattedProducts.filter((item) => item.model === selectedCategory);

  // Calculate total number of pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
  // Paginate data based on current page
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  return (
    <div>
        <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        />
    <div className="photo-grid">
        {paginatedData.map((item, index) => (
            <Link to={`/item/${item.id}`} key={index} className="grid-item-link">
          <div key={index} className="grid-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
          </Link>
        ))}
    </div>
      <div className='pagination'>
          <button
            onClick={()=> setCurrentPage((prevPage)=>Math.max(prevPage-1, 1))}
            disabled={currentPage===1}
            >
              Previous
            </button>
            <span>{`${currentPage}/${totalPages}`}</span>
            <button
            onClick={()=> setCurrentPage((prevPage)=>Math.min(prevPage+1, totalPages))}
            disabled={totalPages===1}
            >
              Next
            </button>
      </div>
    </div>
  );
}

export default PhotoGrid;