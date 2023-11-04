import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slice/categoriesSlice"
import productReducer from "../slice/productsSlice";
import shopReducer from "../slice/shopSlice";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        shop: shopReducer
    }
})
