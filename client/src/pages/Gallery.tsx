// Product.tsx
import React from 'react';

interface ProductProps {
  image: string;
  title: string;
  price: number;
}

const Product: React.FC<ProductProps> = ({ image, title, price }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p>
    </div>
  );
};

export default Product;
