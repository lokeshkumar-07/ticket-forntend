import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: 'Jaipur'
}

const persistData = JSON.parse(localStorage.getItem('persist:root'));
const authData = persistData ? JSON.parse(persistData.auth) : null

const token = authData ? authData.token : null;


const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        reset: (state) => {
            state.city = "Jaipur"
        },
        change_city: (state, action) => {
            state.city = action.payload
        }
    },
})

export const {reset, change_city} = citySlice.actions
export default citySlice.reducer

