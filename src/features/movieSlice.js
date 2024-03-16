import axios from "axios"
import { ApiUrl } from "../../config"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    movie: {},
    message: "",
    isLoading: false
}


const data_token = JSON.parse(localStorage.getItem('currentUser'))

const persistData = JSON.parse(localStorage.getItem('persist:root'));
const authData = persistData ? JSON.parse(persistData.auth) : null

const token = authData ? authData.token : null;

export const createmovie = createAsyncThunk('movie/create', async(data, thunkApi) => {
    console.log(data)
    try{
        const res = await axios({
            url: `${ApiUrl}/movie/create`,
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

export const getMovie = createAsyncThunk('movie/get', async(data,thunkApi) => {
    console.log("Getting Movie")
    try{
        const res = await axios({
            url: `${ApiUrl}/movie/get/${data.movieName}`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'auth-token': token
            },
        })
        console.log(res.data)
        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const deleteMovie = createAsyncThunk('movie/delete', async(data,thunkApi) => {
    console.log("Deleting Movie")
    try{
        const res = await axios({
            url: `${ApiUrl}/movie/delete/${data.id}`,
            method: 'DELETE',
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

export const allMovies = createAsyncThunk('movie/getallmovies', async(data,thunkApi) => {


    console.log("getting movie slice...")
    const persistData = JSON.parse(localStorage.getItem('persist:root'));
    const authData = persistData ? JSON.parse(persistData.auth) : null

    const token = authData ? authData.token : null;
    const data_token = JSON.parse(localStorage.getItem('currentUser'))
    

    console.log(persistData)
    console.log(data_token)
    try{
        const res = await axios({
            url: `${ApiUrl}/movie/all?genre=${data.genre}&lcategory=${data.languageCat}&search=${data.search}`,
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            },
        })

        return res.data
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()

        return thunkApi.rejectWithValue(message)
    }
})

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        reset: (state) => {
            state.message = "",
            state.isLoading = false
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(createmovie.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createmovie.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(createmovie.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
        builder.addCase(allMovies.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(allMovies.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(allMovies.fulfilled, (state, action) => {
            state.isLoading = false,
            state.movies = action.payload
        })
        builder.addCase(getMovie.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMovie.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(getMovie.fulfilled, (state, action) => {
            state.isLoading = false,
            state.movie = action.payload
        })
        builder.addCase(deleteMovie.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteMovie.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload
        })
        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.isLoading = false,
            state.message = action.payload
        })
    }
})

export const {reset} = movieSlice.actions
export default movieSlice.reducer