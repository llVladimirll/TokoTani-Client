import React, { useState, useEffect } from "react";
import { decodeJwt } from "../../utils/jwtUtils";
import ProductForm from "../../components/form/ProductForm";
import "../../styles/add-product.css";
import SellerNavbar from "../../components/navbar/SellerNavbar";

function AddProductPage() {
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      const decodedToken = decodeJwt(token);
      setSellerId(decodedToken.SellerID);
      console.log(decodedToken.SellerID)
    }
  }, []);

  return (
    <div className="add-product-page">
      <SellerNavbar />
      <section className="content">
        <ProductForm sellerId={sellerId} />
      </section>
    </div>
  );
}

export default AddProductPage;
