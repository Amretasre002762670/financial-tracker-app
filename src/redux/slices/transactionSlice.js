import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],
    },
    reducers: {
        setTransactions: (state, action) => {
            state.trasactions = action.payload;
        }
    }
});

export const { setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
