import React from "react";
import { useAuth } from "../service/providers/AuthContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useAuth();
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );
  return (
    <div
      className="header-container"
      style={
        user && user.role === "admin"
          ? { backgroundColor: "#007bff", color: "white" }
          : null
      }
    >
      <h1>Welcome to our E-commerce store!</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>About Us</li>
          <li>Contact</li>
          <Link to="/cart">
            <div className="header-cart-div">
              <FontAwesomeIcon icon={faCartShopping} />
              <span>{cartTotalQuantity}</span>
            </div>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
