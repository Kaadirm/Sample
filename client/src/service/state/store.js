
import { configureStore } from '@reduxjs/toolkit';
import cardSliceReducer from './card/cardSlice';

const store = configureStore({
    reducer: {
        cart: cardSliceReducer,
    },
});

export default store;
