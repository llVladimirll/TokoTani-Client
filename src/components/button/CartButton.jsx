import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CartButton({ productId, userId, quantity }) {
  const [showModal, setShowModal] = useState(false);

  console.log(productId.toString(), userId, quantity);

  const addToCart = () => {
    const requestData = {
      product_id: productId.toString(),
      user_id: userId,
      quantity: quantity
    };

    const response = axios.post(
      "https://toko-tani-server-2.vercel.app/api/products/cart",
      requestData
    )
      .then((response) => {
        console.log("Product added to cart:", response.data);
        setShowModal(true); // Show success modal
        setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
      });
  };

  return (
    <>
      <button className="btn btn-primary rounded-pill px-4 py-2 mb-4 text-white" onClick={addToCart}>
        <i className="fa fa-shopping-cart me-2"></i> Add to Cart
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Added to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product added to cart successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
