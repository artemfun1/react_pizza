import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import pizzaReducer from './slices/pizzaSlice'

export const store = configureStore({
  reducer:{
    filter: filterReducer,
    pizza: pizzaReducer,
  }
})

