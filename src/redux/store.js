import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import trasactionReducer from './slices/transactionSlice';

// Store: entire state is stored; JS object that holds the entire state tree
// Action: object that dispatches the changes needed to be done to the state; type field is required
// Reducer: take current state and action and get the next state
// Dispatch: Send action to store to update state. Provided by react-redux
// Selector: function that reads and retrives data from the Redux state. Read data in React component.
const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: trasactionReducer
    }
});

export default store;