import React, { useEffect, useState } from "react";
import ProductData from "../data/products";
import ProductAddingForm from "./ProductAddingForm";
import ProductAddingButton from "./ProductAddingButton";
import { useAuth } from "../service/providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../service/state/card/cardSlice";
import useApi from "../hooks/useApi";

const ProductList = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();
  const [animationParent] = useAutoAnimate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      setUserRole(user.role);
    }
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const AddingToCart = (product) => {
    if (user === null) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
    }
  };

  const { data, setData, loading, error } = useApi("http://localhost:3000/api");
  return (
    <>
      {loading ? (
        <div className="loading-div">
          <div className="loading"></div>
        </div>
      ) : (
        <div>
          {userRole === "admin" && (
            <ProductAddingButton onClick={handleButtonClick} />
          )}
          <div className="productList-container" ref={animationParent}>
            {data &&
              data.map((product) => (
                <div className="productList-product" key={product.id}>
                  <Link to={`/${product.id}`}>
                    <h2>{product.name}</h2>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="productList-image"
                    />
                  </Link>
                  <div>
                    <p className="productList-description">
                      Description: {product.description}
                    </p>

                    <div>
                      <p className="productList-price">
                        Price: {product.price}
                      </p>
                      <button
                        onClick={() => AddingToCart(product)}
                        className="productList-button"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <ProductAddingForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          setData={setData}
        />
      )}
    </>
  );
};

export default ProductList;
