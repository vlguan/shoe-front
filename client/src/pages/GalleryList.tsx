// ProductList.tsx
import React from 'react';
import Product from './Gallery.tsx';

const products = [
  { id: 1, title: 'Product 1', image: 'url_to_image_1', price: 29.99 },
  { id: 2, title: 'Product 2', image: 'url_to_image_2', price: 39.99 },
  { id: 3, title: 'Product 3', image: 'url_to_image_3', price: 49.99 },
  // Add more products as needed
];

const ProductList: React.FC = () => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
