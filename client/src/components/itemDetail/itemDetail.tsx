import React from "react";
import { useParams } from 'react-router-dom'
const ItemDetails = () =>{
    const{ match } = useParams();
    const data = [
        // Sample data, replace it with your actual data structure
        { title: 'Item 1', description: 'Description for Item 1', price: 20 },
        { title: 'Item 2', description: 'Description for Item 2', price: 30 },
        // Add more items as needed
      ];
    const selectedItem = data[parseInt(match, 10)];

    if (!selectedItem) {
      return <div>Item not found</div>;
    }   
    return (
      <div>
        <h2>{selectedItem.title}</h2>
        <p>Description: {selectedItem.description}</p>
        <p>Price: ${selectedItem.price}</p>
        {/* Add more details or styling as needed */}
      </div>
    );
};
export default ItemDetails;