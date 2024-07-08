import React, { useState } from "react";
import axios from "axios";

export default function ProductForm({ sellerId }) {
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handlePriceChange = (event) => {
    const formattedPrice = event.target.value.replace(/[^\d]/g, '');
    setPriceInput(formattedPrice);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("sellerId", sellerId);
    
    // Convert formatted price back to numeric format
    const numericPrice = parseInt(priceInput, 10);
    formData.set("price", numericPrice);

    try {
      const response = await axios.post(`https://toko-tani-server-2.vercel.app/api/products/${sellerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product posted successfully:", response.data);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        window.location.reload(); // Reload the page
      }, 2000); // Adjust time as needed
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form
        className="product-form"
        id="add-product"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="product-image">
          <div className="product-image-section">
            <label htmlFor="product-image-upload">
              {imagePreview ? (
                <img src={imagePreview} alt="Product Image" id="product-image-preview" />
              ) : (
                <span>Upload Image</span>
              )}
            </label>
            <input
              type="file"
              id="product-image-upload"
              name="productImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="product-details">
          <label htmlFor="product-name">Nama Produk</label>
          <input type="text" id="product-name" name="name" required />
          <label htmlFor="product-category">Kategori</label>
          <select id="product-category" name="categoryName" required>
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
          <textarea id="product-description" name="description" required></textarea>
        </div>
        <div className="buttons">
          <button type="submit" className="save-display">Post Products</button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Product added successfully!</h3>
            <p>Reloading the page...</p>
          </div>
        </div>
      )}
    </div>
  );
}
