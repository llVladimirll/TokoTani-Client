import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="address-item">
      <p>
        {address.address_line1}, {address.address_line2}, {address.city}, {address.province}, {address.postal_code}, {address.country}<br />
      </p>
      <div className="actions">
        <button className="delete"><i className="fas fa-trash-alt"></i></button>
      </div>
    </div>
  );
};

export default AddressCard;
