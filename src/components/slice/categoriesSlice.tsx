import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    categories: [] as string[]
}

export const getCategories = createAsyncThunk<string[]>("category", async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/categories`)
    return response.data;
})

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
}) 

export default categorySlice.reducer;