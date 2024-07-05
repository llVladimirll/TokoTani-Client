import React from "react";

export default function ReviewForm() {
  return (
    <form id="review-form" className="mt-4">
      <h5 className="mb-3">Leave a Review</h5>

      <div className="mb-3">
        <label className="form-label">Rating</label>
        <div className="star-rating">
          <input type="radio" id="rating5" name="rating" value="5" />
          <label htmlFor="rating5"><i className="fa fa-star"></i></label>
          <input type="radio" id="rating4" name="rating" value="4" />
          <label htmlFor="rating4"><i className="fa fa-star"></i></label>
          <input type="radio" id="rating3" name="rating" value="3" />
          <label htmlFor="rating3"><i className="fa fa-star"></i></label>
          <input type="radio" id="rating2" name="rating" value="2" />
          <label htmlFor="rating2"><i className="fa fa-star"></i></label>
          <input type="radio" id="rating1" name="rating" value="1" />
          <label htmlFor="rating1"><i className="fa fa-star"></i></label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="reviewComment" className="form-label">Comment</label>
        <textarea className="form-control" id="reviewComment" rows="3" placeholder="Your Review Comment" required></textarea>
      </div>

      
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
