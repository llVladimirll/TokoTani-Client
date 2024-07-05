import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import close icon


export default function SellerNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Navbar expand="xl" bg="M" variant="light" className="bg-M fixed-top">
        <div className="container px-0">
          <Navbar.Brand href="/">
            <h1 className="text-primary display-6">TokoTani</h1>
          </Navbar.Brand>
          {/* Hamburger menu toggle */}
          <Navbar.Toggle
            className="py-2 px-3"
            aria-controls="navbarCollapse"
            onClick={toggleSidebar}
          >
            <span className="fa fa-bars text-primary">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarCollapse" className="bg-M">
            <Nav className="ms-auto">
              <Nav.Item>
                <Button
                  variant="primary"
                  type="button"
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        {/* Close button */}
        <h5>Seller Center</h5>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {/* Sidebar content here */}
        <Nav className="flex-column">
          {/* Example sidebar items */}
          <Nav.Link href="/seller/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/seller/product">My Products </Nav.Link>
          <Nav.Link href="/seller/add-product">Add Product</Nav.Link>
          <Nav.Link href="/seller/Orders">Orders</Nav.Link>
        </Nav>
      </div>
    </>
  );
}
