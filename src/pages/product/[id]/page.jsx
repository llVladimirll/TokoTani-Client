import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../../components/product-details/ProductDetails";
import axios from "axios";
import Navbar from "../../../components/navbar/Navbar.jsx";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the 'id' parameter from URL

  useEffect(() => {
    // Function to fetch product data
    const fetchProduct = async () => {
      try {
        // Construct the API endpoint URL with productId
        const response = await axios.get(`https://toko-tani-server-2.vercel.app/api/products/${id}`);
        // Assuming response.data is the product object
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Call the fetchProduct function
    fetchProduct();
  }, [id]); // Dependency on 'id' ensures fetchProduct runs whenever 'id' changes

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 mt-5">
      <div className="container py-5">
        <div className="row g-4 mb-5" id="productContainer">
            {product && <ProductDetails product={product} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
