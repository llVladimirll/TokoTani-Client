import React, { useState, useEffect } from "react";
import { useNavigate, useParams,  } from "react-router-dom";
import axios from "axios";

const EditProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [priceInput, setPriceInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category_name: "fruits", // Default category
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://toko-tani-server-2.vercel.app/api/sellers/product/${productId}`);
        const product = response.data;
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          category_name: product.category_name,
        });
        setPriceInput(product.price.toString());
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handlePriceChange = (event) => {
    const formattedPrice = event.target.value.replace(/[^\d]/g, '');
    setPriceInput(formattedPrice);
    setFormData({
      ...formData,
      price: parseInt(formattedPrice, 10),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedFields = {};
  
      // Check if each field has changed and update if necessary
      if (formData.name.trim() !== formData.name.trim()) {
        updatedFields.name = formData.name.trim();
      }
      if (formData.price !== 0 && formData.price !== formData.price) {
        updatedFields.price = formData.price;
      }
      if (formData.description.trim() !== formData.description.trim()) {
        updatedFields.description = formData.description.trim();
      }
      if (formData.category_name !== formData.category_name.trim()) {
        updatedFields.category_name = formData.category_name.trim();
      }
  
      // If no fields have changed, send the entire original formData
      const body = Object.keys(updatedFields).length > 0 ? updatedFields : formData;
  
      // Format the price with .00 if it's included in the updatedFields
      if (body.price !== undefined && !body.price.toString().includes('.')) {
        body.price = `${body.price}.00`;
      }
  
      const response = await axios.put(`https://toko-tani-server-2.vercel.app/api/sellers/product/${productId}`, body);
      console.log("Product updated successfully:", response.data);
      navigate('/seller/product')
      // Optionally, handle redirection or further actions upon successful update
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  };
  
  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/seller/product"); // Redirect to /seller/product
    // Optionally, perform additional actions when closing the modal
  };

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      {error && <div className="error-message">{error}</div>}
      <form
        className="product-form"
        id="edit-product"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="product-details">
          <label htmlFor="product-name">Nama Produk</label>
          <input
            type="text"
            id="product-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="product-category">Kategori</label>
          <select
            id="product-category"
            name="category_name"
            value={formData.category_name}
            onChange={handleInputChange}
            required
          >
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="meat">Meat</option>
            <option value="fish">Fish</option>
          </select>
          <label htmlFor="product-price">Harga</label>
          <input
            type="text"
            id="product-price"
            name="price"
            value={`Rp ${priceInput ? parseInt(priceInput, 10).toLocaleString('id-ID') : ''}`}
            onChange={handlePriceChange}
            required
          />
          <label htmlFor="product-description">Deskripsi Produk</label>
          <textarea
            id="product-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="buttons">
          <button type="submit" className="save-display">Update Product</button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Product updated successfully!</h3>
            <p>Reloading the page...</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductForm;
