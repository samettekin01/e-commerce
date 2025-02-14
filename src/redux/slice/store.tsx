import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slice/categoriesSlice"
import productReducer from "../slice/productsSlice";
import shopReducer from "../slice/shopSlice";
import statusReducer from "../slice/statusSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        shop: shopReducer,
        status: statusReducer
    }
})

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export const useAppDispatch: () => typeof store.dispatch = useDispatch;