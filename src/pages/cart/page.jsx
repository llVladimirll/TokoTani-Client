import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../../components/CartItem";
import TotalCart from "../../components/TotalCart";
import { decodeJwt } from "../../utils/jwtUtils";
import Navbar from "../../components/navbar/Navbar";
import CheckoutButton from "../../components/button/CheckoutButton";
import AddressForm from "../../components/form/AddressForm";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [errorCart, setErrorCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = decodeJwt(token);
      setUserId(decodedToken.userID);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
      fetchAddresses();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `https://toko-tani-server-2.vercel.app/api/products/cart/${userId}`
      );
      setCartItems(response.data.cartItems || []);
      setLoadingCart(false);
    } catch (error) {
      setErrorCart(
        error.response?.data?.message || "Error fetching cart items"
      );
      setLoadingCart(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `https://toko-tani-server-2.vercel.app/api/users/address/${userId}`
      );
      if (response.data && Array.isArray(response.data)) {
        setAddresses(response.data);
      } else {
        console.error("Invalid or empty addresses response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  const handleUpdateCart = () => {
    fetchCartItems();
  };

  const handleCheckboxChange = (productId) => {
    const updatedCheckedItems = checkedItems.includes(productId)
      ? checkedItems.filter((id) => id !== productId)
      : [...checkedItems, productId];

    setCheckedItems(updatedCheckedItems);
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleSelectChange = (event) => {
    setSelectedAddressId(event.target.value);
  };

  const handleCheckout = async () => {
    // Implement checkout logic here
    console.log("Selected Address ID:", selectedAddressId);
    // Call backend API for checkout process
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <form id="cart-form">
              {loadingCart ? (
                <p>Loading cart...</p>
              ) : errorCart ? (
                <p>Error: {errorCart}</p>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.product_id}
                    product={item}
                    userId={userId}
                    onUpdateCart={handleUpdateCart}
                    onCheckboxChange={handleCheckboxChange}
                    isChecked={checkedItems.includes(item.product_id)}
                  />
                ))
              )}
            </form>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <h5 className="mb-3">Select Shipping Address</h5>
              <select
                id="address-select"
                className="form-select mb-4"
                value={selectedAddressId}
                onChange={handleSelectChange}
              >
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={address.id}>
                    {`${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.province}, ${address.country}`}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-secondary mb-4"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#new-address-form"
              >
                Add New Address
              </button>
              <div id="new-address-form" className="collapse">
                <AddressForm userId={userId} onAddAddress={handleAddAddress} />
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-end">
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <TotalCart total={total} />
              <CheckoutButton
                checkedItems={checkedItems}
                userId={userId}
                addressId={selectedAddressId}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
