// Sidebar.js
import React from 'react';
import '../../styles/sidebar.css'; // Import custom CSS for sidebar

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className="custom-sidebar">
      <h2>Settings</h2>
      <nav>
        <ul>
          <li className={activeTab === "editProfile" ? "active" : ""}>
            <button onClick={() => onTabChange("editProfile")}>Edit Profile</button>
          </li>
          <li className={activeTab === "viewAddresses" ? "active" : ""}>
            <button onClick={() => onTabChange("viewAddresses")}>View Addresses</button>
          </li>
          <li className={activeTab === "viewOrders" ? "active" : ""}>
            <button onClick={() => onTabChange("viewOrders")}>View Orders</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
