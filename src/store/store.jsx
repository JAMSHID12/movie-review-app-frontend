import { configureStore } from "@reduxjs/toolkit";
import userReducer  from '../reducer/UserSlice'

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;