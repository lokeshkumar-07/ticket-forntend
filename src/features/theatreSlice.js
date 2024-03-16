import axios from "axios"
import { ApiUrl } from "../../config"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    theatres: [],
    theatre: {},
    message: "",
    isLoading: false
}

const persistData = JSON.parse(localStorage.getItem('persist:root'));
const authData = persistData ? JSON.parse(persistData.auth) : null

const token = authData ? authData.token : null;

export const createTheatre = createAsyncThunk('theatre/create', async(data, thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/theatre/create`,
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


export const allTheatre = createAsyncThunk('theatre/getall', async(thunkApi) => {
    try{
        const res = await axios({
            url: `${ApiUrl}/theatre/all`,
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

const theatreSlice = createSlice({
    name: 'theatre',
    initialState,
    reducers: {
        reset: (state) => {
            state.message = "",
            state.isLoading = false
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(createTheatre.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createTheatre.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(createTheatre.fulfilled, (state, action) => {
            state.isLoading = false,
            state.theatres.push(action.payload)
        })
        builder.addCase(allTheatre.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(allTheatre.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(allTheatre.fulfilled, (state, action) => {
            state.isLoading = false,
            state.theatres = action.payload
        })
    }
})

export const {reset} = theatreSlice.actions
export default theatreSlice.reducer