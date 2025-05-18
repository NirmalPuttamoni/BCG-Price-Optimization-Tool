import { configureStore } from "@reduxjs/toolkit"
import productReducer from './ProductSlice';
// import userReducer from "./userSlice"

const Store = configureStore({
    reducer: {
        // users: userReducer,
        product: productReducer,
    }
})

export default Store;