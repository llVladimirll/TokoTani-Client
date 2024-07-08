import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { checkJwtExpiration, decodeJwt } from "../../utils/jwtUtils";
import Review from "./Review";
import CartButton from "../button/CartButton";
import ChatButton from "../button/ChatButton";
import ReviewForm from "./ReviewForm";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("about");
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
      const decodedToken = decodeJwt(token);
      if (decodedToken) {
        setUserId(decodedToken.userID);
        if (!checkJwtExpiration(token)) {
          handleLogout(token);
        }
      } else {
        console.log('failed to decode token');
      }
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserId(null);
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };


  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="border rounded">
            <a href="#">
              <img src={product.image_url} className="img-fluid rounded" alt="Product Image" />
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="fw-bold mb-3">{product.name}</h4>
          <p className="mb-3">Category: {product.category}</p>
          <h5 className="fw-bold mb-3">{product.price}</h5>
          <div className="input-group quantity mb-3" style={{ maxWidth: "150px" }}>
            <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={decrementQuantity}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="text" className="form-control form-control-sm text-center border-0" value={quantity} readOnly />
            <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={incrementQuantity}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {userToken && (
            <div id="cartButton">
              <CartButton productId={product.id} userId={userId} quantity={quantity} />
            </div>
          )}
          < ChatButton phoneNumber={product.seller.phone_number} sellerName={product.seller.name} />
        </div>
        <div className="col-lg-12">
          <nav>
            <div className="nav nav-tabs mb-3">
              <button
                className={`nav-link ${activeTab === "about" ? "active border-bottom border-primary" : "border-bottom-0"}`}
                type="button"
                onClick={() => handleTabChange("about")}
                aria-selected={activeTab === "about" ? "true" : "false"}
              >
                Description
              </button>
              <button
                className={`nav-link ${activeTab === "reviews" ? "active border-bottom border-primary" : "border-bottom-0"}`}
                type="button"
                onClick={() => handleTabChange("reviews")}
                aria-selected={activeTab === "reviews" ? "true" : "false"}
              >
                Reviews
              </button>
            </div>
          </nav>
          <div className="tab-content mb-5">
            <div className={`tab-pane fade ${activeTab === "about" ? "show active" : ""}`} id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
              <p className="description">{product.description}</p>
              <div className="px-2">
                <div className="row g-4">
                  <div className="col-6">
                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                      <div className="col-6">
                        <p className="mb-0">City of Origin</p>
                      </div>
                      <div className="col-6">
                        <p className="mb-0">{product.seller.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === "reviews" ? "show active" : ""}`} id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
              <div id="reviewsContainer">
                <Review reviews={product.feedback} />
              </div>
              <div id="formContainer">
                <ReviewForm userId={userId} productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
