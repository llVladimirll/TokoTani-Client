import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faSearch, faBars, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { decodeJwt, checkJwtExpiration } from '../../utils/jwtUtils';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  const [userToken, setUserToken] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      const decodedToken = decodeJwt(token);
      if (decodedToken) {
        setIsSeller(decodedToken.isSeller);
        if (!checkJwtExpiration(token)) {
          handleLogout();
        }
      } else {
        console.error("Failed to decode token.");
      }
    }
  }, []);

  function handleSearch() {
    navigate(`/product?search=${encodeURIComponent(searchInput)}`);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  function handleLogout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setIsSeller(false);
  }

  function handleProfileClick() {
    if (isSeller) {
      navigate('/seller/dashboard');
    } else {
      navigate('/seller/register');
    }
  }

  function handleProfileNavigate() {
    navigate('/profile');
  }

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
              <Link
                to="/checkout"
                id="shopping-bag-link"
                className="position-relative me-4 my-auto"
              >
                <FontAwesomeIcon icon={faShoppingBag} style={{ color: 'white' }} size="2x" />
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
