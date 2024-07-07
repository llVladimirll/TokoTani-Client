import React, { useEffect, useState } from "react";
import axios from "axios";
import Address from "../../components/Address";
import CartItem from "../../components/CartItem";
import TotalCart from "../../components/TotalCart";
import { decodeJwt } from "../../utils/jwtUtils";
import Navbar from "../../components/navbar/Navbar";
import CheckoutButton from "../../components/button/CheckoutButton";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [errorCart, setErrorCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const decodedToken = decodeJwt(token);
      const userID = decodedToken.userID;

      const response = await axios.get(
        `http://localhost:3330/api/products/cart/${userID}`
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

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const decodedToken = decodeJwt(token);
    const userID = decodedToken.userID;
    setUserId(userID);

    if (userID) {
      fetchCartItems();
    }
  }, [userId]); // Only fetch cart items when userId changes

  useEffect(() => {
    // Calculate total cart amount when cartItems change
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      let totalAmount = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  const handleUpdateCart = () => {
    fetchCartItems(); // Refresh cart items after update
  };

  const handleCheckboxChange = (productId) => {
    // Toggle checked status of the item
    const updatedCheckedItems = checkedItems.includes(productId)
      ? checkedItems.filter((id) => id !== productId)
      : [...checkedItems, productId];

    setCheckedItems(updatedCheckedItems);
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

          <Address userId={userId} />
          <div className="row g-4 justify-content-end">
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <TotalCart total={total} />
              <CheckoutButton checkedItems={checkedItems} userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
