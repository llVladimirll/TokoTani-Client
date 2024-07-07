import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customCard.css';  // Import custom CSS

const AddressCard = ({ address }) => {
  const { address_line1, address_line2, city, province, postal_code, country } = address;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Text className="custom-info-text">
          {address_line1}, {address_line2 ? `${address_line2}, ` : ""}{city}, {province}, {postal_code}, {country}
        </Card.Text>
        <div className="address-actions">
          <Button variant="outline-secondary" className="me-2" title="Set as Default">
            <FontAwesomeIcon icon={regularStar} />
          </Button>
          <Button variant="outline-primary" className="me-2" title="Edit Address">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="outline-danger" title="Delete Address">
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
