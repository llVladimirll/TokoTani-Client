import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewForm({ userId, productId }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    const formData = {
      user_id: userId,
      product_id: productId,
      rating: rating,
      comment: comment,
    };

    try {
      const response = await axios.post(
        "https://toko-tani-server-2.vercel.app/api/products/feedback",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("There was a problem with the review submission:", error);
    }
  };

  return (
    <form id="review-form" className="mt-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Leave a Review</h5>

      <div className="mb-3">
        <label className="form-label">Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              onClick={() => handleStarClick(star)}
              style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
            />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="reviewComment" className="form-label">Comment</label>
        <textarea
          className="form-control"
          id="reviewComment"
          rows="3"
          placeholder="Your Review Comment"
          value={comment}
          onChange={handleCommentChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
