import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../service/providers/AuthContext";
import useApi from "../hooks/useApi";

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [userRole, setUserRole] = useState();
  const [product, setProduct] = useState(null);
  const { data, setData, loading, error } = useApi("http://localhost:3000/api");
  useEffect(() => {
    if (user !== null) {
      setUserRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      const selectedProduct = data.find(
        (product) => product.id === parseInt(id)
      );
      setProduct(selectedProduct);
    }
  }, [data]);

  return loading ? (
    <div className="loading-div">
      <div className="loading"></div>
    </div>
  ) : (
    product && (
      <div className="productDetails-container">
        <div>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            className="productDetails-image"
          />
          <div>
            <p className="productDetails-description">
              Description: {product.description}
            </p>
            <div>
              <p className="productDetails-price">Price: {product.price}</p>
              <button className="productDetails-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
