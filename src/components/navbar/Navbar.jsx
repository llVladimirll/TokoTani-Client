import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faSearch, faBars, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { decodeJwt, checkJwtExpiration } from '../../utils/jwtUtils';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

function Navbar() {
  const [userToken, setUserToken] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [userId, setUserId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = decodeJwt(token);
      setUserToken(token);
      setUserId(decodedToken.userID);
      if (!checkJwtExpiration(token)) {
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (sellerToken) {
      setIsSeller(true);
    } else {
      setIsSeller(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3330/api/users/cart/${userId}`);
      if (response.data && response.data.itemCount !== undefined) {
        setItemCount(response.data.itemCount);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleSearch = () => {
    navigate(`/product?search=${encodeURIComponent(searchInput)}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('sellerToken');
    setUserToken(null);
    setUserId(null);
    setIsSeller(false);
  };

  const handleProfileClick = () => {
    if (isSeller) {
      navigate('/seller/dashboard');
    } else {
      navigate('/seller/register');
    }
  };

  const handleProfileNavigate = () => {
    navigate('/profile');
  };

  return (
    <div className="container-fluid fixed-top">
      <div className="container px-0">
        <nav className="navbar navbar-light bg-M navbar-expand-xl">
          <Link to='/' className="navbar-brand">
            <h1 className="text-primary display-6">TokoTani</h1>
          </Link>
          <div className="modal-body d-flex align-items-center">
            <div className="input-group w-75 mx-auto d-flex">
              <input
                type="search"
                className="form-control p-3"
                placeholder="keywords"
                aria-describedby="search-icon-1"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <span
                id="search-icon-1"
                className="input-group-text p-3"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} style={{ color: 'white' }} />
              </span>
            </div>
          </div>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} className="text-primary" />
          </button>
          <div className="collapse navbar-collapse bg-M" id="navbarCollapse">
            <div className="d-flex ms-auto m-3 me-0">
              <Link to="/cart" id="shopping-bag-link" className="position-relative me-4 my-auto">
                <FontAwesomeIcon icon={faShoppingBag} style={{ color: 'white' }} size="2x" />
                {itemCount > 0 && (
                  <span className="badge bg-primary rounded-circle position-absolute top-0 start-100 translate-middle">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Dropdown className="my-auto">
                {userToken ? (
                  <Dropdown.Toggle variant="link" id="profileDropdown" className="my-auto">
                    <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} size="2x" />
                  </Dropdown.Toggle>
                ) : (
                  <Link to="/register" className="my-auto">
                    <FontAwesomeIcon icon={faSignInAlt} style={{ color: 'white' }} size="2x" />
                  </Link>
                )}
                <Dropdown.Menu align="end">
                  {userToken ? (
                    <>
                      <Dropdown.Item onClick={handleProfileNavigate} style={{ color: 'black' }}>
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleProfileClick} style={{ color: 'black' }}>
                        {isSeller ? 'Dashboard' : 'Register Seller'}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout} style={{ color: 'black' }}>
                        Log Out
                      </Dropdown.Item>
                    </>
                  ) : null}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
