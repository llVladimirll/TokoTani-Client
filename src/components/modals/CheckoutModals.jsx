import React, { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript bundle

export default function CheckoutModals({ showModal }) {
  useEffect(() => {
    if (showModal) {
      const orderProcessingModal = new window.bootstrap.Modal(document.getElementById('orderProcessingModal'), {
        keyboard: false
      });
      orderProcessingModal.show();
    }
  }, [showModal]);

  return (
    <div
      className="modal fade"
      id="orderProcessingModal"
      tabIndex="-1"
      aria-labelledby="orderProcessingModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderProcessingModalLabel">
              Order Processing
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Your order has been successfully placed. The seller will now
              process your order.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
