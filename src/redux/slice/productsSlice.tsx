import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryClient } from "react-query";
import { STATUS } from "../../components/utils/status";
import { Product } from "../../types/types";

interface InitialState {
    products: Product[],
    productsStatus: string,
    productDetail?: Product[],
    productDetailStatus: string
    category: Product[],
    categoryStatus: string,
    sliderProducts: Product[],
    sliderProductsStatus: string
}

const initialState: InitialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productDetail: [],
    productDetailStatus: STATUS.IDLE,
    category: [],
    categoryStatus: STATUS.IDLE,
    sliderProducts: [],
    sliderProductsStatus: STATUS.IDLE
}

const queryClient = new QueryClient();

const createFetchThunk = (name: string, url: string) => {
    return createAsyncThunk(name, async (param?: any) => {
        const promise = await queryClient.fetchQuery(name, () =>
            axios.get(url.replace(':param', param))
        )
        return promise.data;
    });
};

export const getProducts = createFetchThunk("products", "https://fakestoreapi.com/products/");
export const getDetailProduct = createFetchThunk("productDetail", "https://fakestoreapi.com/products/:param");
export const getCategory = createFetchThunk("categories", "https://fakestoreapi.com/products/category/:param");
export const getSliderProducts = createFetchThunk("sliderProducts", "https://fakestoreapi.com/products?limit=5");

const addAsyncCases = (builder: any, thunk: any, stateKey: string, statusKey: string) => {
    builder
        .addCase(thunk.pending, (state: any) => {
            state[statusKey] = STATUS.LOADING;
        })
        .addCase(thunk.fulfilled, (state: any, action: any) => {
            state[stateKey] = action.payload;
            state[statusKey] = STATUS.SUCCESS;
        })
        .addCase(thunk.rejected, (state: any) => {
            state[statusKey] = STATUS.FAIL;
        });
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        addAsyncCases(builder, getProducts, 'products', 'productsStatus');
        addAsyncCases(builder, getDetailProduct, 'productDetail', 'productDetailStatus');
        addAsyncCases(builder, getCategory, 'category', 'categoryStatus');
        addAsyncCases(builder, getSliderProducts, 'sliderProducts', 'sliderProductsStatus');
    }
});

export default productSlice.reducer;