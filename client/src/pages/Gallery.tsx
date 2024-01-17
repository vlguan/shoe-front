// PhotoGrid.js
import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './PhotoGrid.css'; // Import your styles
import Filter from '../components/filter/filter.tsx';
import ItemDetails from '../components/itemDetail/itemDetail.tsx';
const PhotoGrid = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories from data
  const categories = Array.from(new Set(data.map((item) => item.category)));

    const filteredData =
    selectedCategory === 'all'
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <div>
        <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        />
    <div className="photo-grid">
        {data.map((item, index) => (
            <Link to={`/item/${index}`} key={index} className="grid-item-link">
          <div key={index} className="grid-item">
            <img src={item.photo} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
          </div>
          </Link>
        ))}
    </div>
    </div>
  );
}

export default PhotoGrid;