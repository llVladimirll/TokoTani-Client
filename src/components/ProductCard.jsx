import React from 'react';
import { Link } from 'react-router-dom';


function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="rounded position-relative fruite-item">
        <div className="fruite-image">
          <img 
            src={product.image_url} 
            className="img-fluid w-100 rounded-top" 
            alt={product.name} 
            style={{ maxHeight: '200px', objectFit: 'cover'}}
            
          />
        </div>
        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
          <h4>{product.name}</h4>
          <div className="d-flex justify-content-between">
            <p className="text-dark fs-5 fw-bold mb-0">{product.price} / kg</p>
          </div>
          <div><p>{product.seller_location}</p></div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
