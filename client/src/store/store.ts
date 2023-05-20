import { configureStore } from '@reduxjs/toolkit'

import dietsReducer from "./dietsSlice"
import loadingReducer from "./loadingSlice"
import lastCreatedDietReducer from './lastCreatedDietSlice'
import filteredDietsReducer from './filteredDietsSlice'


export const store = configureStore({
  reducer: {
    diets: dietsReducer,
    loading: loadingReducer,
    lastCreatedDiet: lastCreatedDietReducer,
    filteredDiets: filteredDietsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch