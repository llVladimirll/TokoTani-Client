import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const generateStarRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={`star-${i}`} className="text-warning" />);
  }

  // Half star if necessary
  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half-star" className="text-warning" />);
  }

  // Empty stars
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={`empty-${i}`} className="text-muted" />);
  }

  return stars;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const Review = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div className="d-flex mb-4" key={review.id}>
          <div className="flex-shrink-0 me-3">
            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
              <FontAwesomeIcon icon={faUser} className="text-light" />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <h6 className="mb-0">{review.user.name}</h6>
              <small className="text-muted">{formatDate(review.created_at)}</small>
            </div>
            <div className="d-flex align-items-center mb-2">
              {generateStarRating(review.rating)}
            </div>
            <p className="mb-0">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
