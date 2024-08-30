import { createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types/types"

interface InitialState {
    total: number
    grandTotal: number
}
const initialState: InitialState = {
    total: 0,
    grandTotal: 0
}
export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        totalCalculate: (state) => {
            const listString = localStorage.getItem("basket");
            if (listString) {
                const list: Product[] = JSON.parse(listString)
                state.total = Number(list.map(item => item.amount).reduce((prev, cur) => (prev! + cur!), 0))
            }else{
                state.total = 0
            }
        },
        grandTotal: (state) => {
            const listString = localStorage.getItem("basket");
            if (listString) {
                const getBasket: Product[] = JSON.parse(listString)
                state.grandTotal = Number(getBasket.map((data) => data.total).reduce((prev, cur) => (prev! + cur!), 0))
            }else{
                state.grandTotal = 0
            }
        }
    }
})

export const { totalCalculate, grandTotal } = shopSlice.actions
export default shopSlice.reducer