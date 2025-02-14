import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isOpen: boolean
}

const initialState: InitialState = {
    isOpen: false
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        singUpStatus: state => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { singUpStatus } = statusSlice.actions
export default statusSlice.reducer