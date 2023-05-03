import { createAction, createSlice } from "@reduxjs/toolkit"

import { IDiet } from "../Interfaces"
import { RootState } from "./store";


const initialDietsState: IDiet[] = [];

export const dietsSlice = createSlice({
  name: 'diets',
  initialState: initialDietsState,
  reducers: {
    setDiets: (_state, action) => {
      return action.payload;
    }
  }
});

export const { setDiets } = dietsSlice.actions;

export const selectDiets = (state : RootState) => state.diets

export default dietsSlice.reducer;