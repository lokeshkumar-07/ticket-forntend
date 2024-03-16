import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../../config";

const initialState = {
    bookings: [],
    booking: {},
    message: "",
    isLoading: false
}

const persistData = JSON.parse(localStorage.getItem('persist:root'));
const authData = persistData ? JSON.parse(persistData.auth) : null

const token = authData ? authData.token : null;

export const createBooking = createAsyncThunk('bookings/create', async(data,thunkApi) => {
    console.log("Getting Movie",data)
    try{
        const res = await axios({
            url: `${ApiUrl}/bookings/create`,
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            },
            data: data
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})


export const myBookings = createAsyncThunk('bookings/mybookings', async(thunkApi) => {
    console.log("Getting Bookings")
    try{
        const res = await axios({
            url: `${ApiUrl}/bookings/my`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            },
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        reset: (state) => {
            state.bookings = [],
            state.isLoading = false,
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state) =>{
            state.isLoading = true
        })
        builder.addCase(createBooking.rejected, (state,action) =>{
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(createBooking.fulfilled, (state,action) =>{
            state.isLoading = false,
            state.bookings.push(action.payload)
        })
        builder.addCase(myBookings.pending, (state) =>{
            state.isLoading = true
        })
        builder.addCase(myBookings.rejected, (state,action) =>{
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(myBookings.fulfilled, (state,action) =>{
            state.isLoading = true,
            state.bookings = action.payload
        })
        
    }
})

export const {reset} = bookingSlice.actions
export default bookingSlice.reducer

