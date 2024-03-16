import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage"
import { FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import authSlice from "../features/authSlice";
import theatreSlice from "../features/theatreSlice";
import movieSlice from "../features/movieSlice";
import citySlice from "../features/citySlice";
import showSlice from "../features/showSlice";
import bookingSlice from "../features/bookingSlice";

const rootReducer = combineReducers({
    auth: authSlice, 
    theatre: theatreSlice,
    movie: movieSlice,
    city: citySlice,
    show: showSlice,
    bookings: bookingSlice
})
const persistConfig = {key:'root', storage, version: 1}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE],
      },
    }).concat(thunk),
})

export const persistor = persistStore(store)