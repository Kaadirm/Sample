import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [
    // {
    //   id: 1,
    //   name: "Product 1",
    //   price: 10,
    //   image: "https://via.placeholder.com/150",
    //   amount: 10,
    // },
    // {
    //   id: 2,
    //   name: "Product 2",
    //   price: 20,
    //   image: "https://via.placeholder.com/150",
    //   amount: 20,
    // },
    // {
    //   id: 3,
    //   name: "Product 3",
    //   price: 30,
    //   image: "https://via.placeholder.com/150",
    //   amount: 30,
    // },
  ],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

initialState.cartTotalQuantity = initialState.cartItems.reduce(
  (sum, item) => sum + item.amount,
  0
);
initialState.cartTotalAmount = initialState.cartItems.reduce(
  (acc, item) => acc + parseFloat(item.price),
  0
);

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += parseInt(action.payload.quantity);
      } else {
        state.cartItems.push(action.payload);
      }
      state.cartTotalQuantity += action.payload.quantity;
      state.cartTotalAmount +=
        action.payload.price * action.payload.quantity.toFixed(2);
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (card) => card !== existingItem
        );
      }
      state.cartTotalQuantity -= existingItem.quantity;
      const totalAmount = existingItem.price * existingItem.quantity;
      state.cartTotalAmount -= totalAmount < 0 ? 0 : totalAmount;
    },

    increaseAmount: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += existingItem.price;
      }
    },

    decreaseAmount: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        }
        state.cartTotalQuantity -= 1;
        state.cartTotalAmount -= parseFloat(existingItem.price.toFixed(2));
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
  resetCart,
} = cardSlice.actions;

export default cardSlice.reducer;
