import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryClient } from "react-query";
import { STATUS } from "../utils/status";
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

const queryClient = new QueryClient()
export const getProducts = createAsyncThunk("products", async () => {
    const promise = await queryClient.fetchQuery("products", () =>
        axios.get(`https://fakestoreapi.com/products/`)
    )
    return promise.data;
})

export const getDetailProduct = createAsyncThunk("productDetail", async (id: number) => {
    const promise = await queryClient.fetchQuery("productDetail", () =>
        axios.get(`https://fakestoreapi.com/products/${id}`)
    )
    return promise.data;
})
export const getCategory = createAsyncThunk("categories", async (category: string) => {
    const promise = await queryClient.fetchQuery("categories", () =>
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
    )
    return promise.data;
})

export const getSliderProducts = createAsyncThunk("sliderProducts", async () => {
    const promise = await queryClient.fetchQuery("sliderProducts", () =>
        axios.get(`https://fakestoreapi.com/products?limit=5`)
    )
    return promise.data;
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.productsStatus = STATUS.SUCCESS
            })
            .addCase(getProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAIL
            })
            .addCase(getDetailProduct.pending, (state) => {
                state.productDetailStatus = STATUS.LOADING
            })
            .addCase(getDetailProduct.fulfilled, (state, action) => {
                state.productDetail = action.payload
                state.productDetailStatus = STATUS.SUCCESS
            })
            .addCase(getDetailProduct.rejected, (state) => {
                state.productDetailStatus = STATUS.FAIL
            })
            .addCase(getCategory.pending, (state) => {
                state.categoryStatus = STATUS.LOADING
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.categoryStatus = STATUS.SUCCESS
                state.category = action.payload
            })
            .addCase(getCategory.rejected, (state) => {
                state.categoryStatus = STATUS.FAIL
            })
            .addCase(getSliderProducts.fulfilled, (state,action) => {
                state.sliderProducts = action.payload
                state.sliderProductsStatus = STATUS.SUCCESS
            })
            .addCase(getSliderProducts.pending, (state) => {
                state.categoryStatus = STATUS.LOADING
            })
            .addCase(getSliderProducts.rejected, (state) => {
                state.categoryStatus = STATUS.FAIL
            })
    }
})

export default productSlice.reducer;