import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { ApiUrl } from "../../config";

const initialState = {
    shows: [],
    noFilterShows: [],
    show: {},
    message: "",
    isLoading: false
}

const persistData = JSON.parse(localStorage.getItem('persist:root'));
const authData = persistData ? JSON.parse(persistData.auth) : null

const token = authData ? authData.token : null;

export const createShow = createAsyncThunk('chows/create', async (data, thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/shows/create`,
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



export const allShows = createAsyncThunk('shows/all', async (data,thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/shows/allshows?movie=${data.movieName}&date=${data.date}&city=${data.city}`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            }
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const noFilterShowss = createAsyncThunk('shows/allshows_nofilter', async (thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/shows/allshows_nofilter`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            }
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const getOneShow = createAsyncThunk('shows/getOne', async (data,thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/shows/get/${data.showId}`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            }
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

const showSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        reset: (state) => {
            state.message = "",
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createShow.pending, (state) => {
            state.isLoading= true
        })
        builder.addCase(createShow.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(createShow.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(allShows.pending, (state) => {
            state.isLoading= true
        })
        builder.addCase(allShows.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(allShows.fulfilled, (state, action) => {
            state.isLoading = false,
            state.shows = action.payload
        })
        builder.addCase(getOneShow.pending, (state) => {
            state.isLoading= true
        })
        builder.addCase(getOneShow.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(getOneShow.fulfilled, (state, action) => {
            state.isLoading = false,
            state.show = action.payload
        })
        builder.addCase(noFilterShowss.pending, (state) => {
            state.isLoading= true
        })
        builder.addCase(noFilterShowss.rejected, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(noFilterShowss.fulfilled, (state, action) => {
            state.isLoading = false,
            state.noFilterShows = action.payload
        })
    }
})

export const {reset} = showSlice.actions
export default showSlice.reducer