import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeFromCart,
  resetCart,
} from "../service/state/card/cardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );
  const cartTotalAmount = useSelector((state) =>
    Math.abs(state.cart.cartTotalAmount).toFixed(2)
  );
  const dispatch = useDispatch();
  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <p className="cart-item-name">{item.name}</p>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <p className="cart-item-quantity">{item.quantity}</p>
          </div>
          <div className="cart-item-buttons">
            <button
              onClick={() => dispatch(removeFromCart(item))}
              className="cart-item-button"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="cart-item-button-icon"
              />
            </button>
            <button
              onClick={() =>
                dispatch(increaseAmount({ id: item.id, quantity: 1 }))
              }
              className="cart-item-button"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="cart-item-button-icon"
              />
            </button>
            <button
              onClick={() =>
                dispatch(decreaseAmount({ id: item.id, quantity: 1 }))
              }
              className="cart-item-button"
            >
              <FontAwesomeIcon
                icon={faMinus}
                className="cart-item-button-icon"
              />
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total-div">
        <p>
          Total Quantity: <span>{cartTotalQuantity}</span>
        </p>
        <p>
          Total Amount: <span>{cartTotalAmount}</span>
        </p>
        <button onClick={() => dispatch(resetCart())}>PURCHASE</button>
      </div>
    </div>
  );
};

export default Cart;
