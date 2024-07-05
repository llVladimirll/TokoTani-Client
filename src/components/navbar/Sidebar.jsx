import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Seller Center</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/seller/dashboard">Dashboard</Link>
          </li>
          <li className="list-group-item">
            <Link to="/seller/products">My Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/seller/add_product">Add Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/seller/orders">Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
