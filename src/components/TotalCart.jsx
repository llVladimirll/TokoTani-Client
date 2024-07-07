import React from "react";

export default function TotalCart({ total }) {
  // Calculate subtotal including a flat shipping rate of 10,000 IDR
  const subtotal = total + 10000;

  // Format subtotal and total amounts in IDR
  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(subtotal);

  return (
    <div className="bg-light rounded">
      <div className="p-4">
        <h1 className="display-6 mb-4">
          Cart <span className="fw-normal">Total</span>
        </h1>
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Subtotal:</h5>
          </div>
          <div className="col text-end">
            <p className="mb-0" id="subtotal">{formattedSubtotal}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Shipping</h5>
          </div>
          <div className="col text-end">
            <p className="mb-0">Flat rate: 10.000</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Total</h5>
          </div>
          <div className="col text-end">
            <p className="mb-0" id="total">{formattedSubtotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
