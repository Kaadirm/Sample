import React from "react";

const ProductAddingButton = ({ onClick }) => {
  return (
    <div className="productAddingBtn-div">
      <button onClick={onClick}>Create Product</button>
    </div>
  );
};

export default ProductAddingButton;
