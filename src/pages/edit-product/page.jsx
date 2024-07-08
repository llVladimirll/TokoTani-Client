import React, { useState } from "react";
import SellerNavbar from "../../components/navbar/SellerNavbar";
import EditProductForm from "../../components/form/EditProductForm";
import "../../styles/edit-product.css";

function EditProductPage() {
  return (
    <div className="edit-product-page">
      <SellerNavbar />
      <section className="content">
        <EditProductForm />
      </section>
    </div>
  );
}

export default EditProductPage;
