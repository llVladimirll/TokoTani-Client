import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerProductCard from "../../components/SellerProductCard";
import { decodeJwt } from "../../utils/jwtUtils";
import '../../styles/seller-product.css';
import SellerNavbar from "../../components/navbar/SellerNavbar";

function SellerProductPage() {
  const [sellerId, setSellerId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    const decodedToken = decodeJwt(token);
    setSellerId(decodedToken.SellerID);
  }, []);

  useEffect(() => {
    if (sellerId) {
      setLoading(true);
      axios.get(`http://localhost:3330/api/sellers/products/${sellerId}`)
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, [sellerId]);

  return (
    <div>
      <SellerNavbar />
      <div className="container main-content mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-column">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <SellerProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProductPage;
