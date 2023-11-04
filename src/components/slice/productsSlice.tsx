import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryClient } from "react-query";
import { STATUS } from "../utils/status";

interface InitialState {
    products: Array<string>,
    productsStatus: string,
    productDetail?: Array<string>,
    productDetailStatus: string
    category: Array<string>,
    categoryStatus: string
}

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productDetail: [],
    productDetailStatus: STATUS.IDLE,
    category: [],
    categoryStatus: STATUS.IDLE
} as InitialState

export const getProducts = createAsyncThunk("products", async () => {
    const queryClient = new QueryClient()
    const promise = await queryClient.fetchQuery("products", () =>
        axios.get(`https://fakestoreapi.com/products/`)
    )
    return promise.data;
})

export const getDetailProduct = createAsyncThunk("productDetail", async (id: number) => {
    const queryClient = new QueryClient()
    const promise = await queryClient.fetchQuery("productDetail", () =>
        axios.get(`https://fakestoreapi.com/products/${id}`)
    )
    return promise.data;
})
export const getCategory = createAsyncThunk("categories", async (category: string) => {
    const queryClient = new QueryClient();
    const promise = await queryClient.fetchQuery("categories", () =>
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
    )
    return promise.data
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.productsStatus = STATUS.LOADING
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.productsStatus = STATUS.SUCCESS
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productsStatus = STATUS.FAIL
            })
            .addCase(getDetailProduct.pending, (state, action) => {
                state.productDetailStatus = STATUS.LOADING
            })
            .addCase(getDetailProduct.fulfilled, (state, action) => {
                state.productDetail = action.payload
                state.productDetailStatus = STATUS.SUCCESS
            })
            .addCase(getDetailProduct.rejected, (state, action) => {
                state.productDetailStatus = STATUS.FAIL
            })
            .addCase(getCategory.pending, (state, action) => {
                state.categoryStatus = STATUS.LOADING
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryStatus = STATUS.SUCCESS
                state.category = action.payload
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.categoryStatus = STATUS.FAIL
            })
    }
})

export default productSlice.reducer;