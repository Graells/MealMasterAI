import { createAction, createSlice } from "@reduxjs/toolkit"

import { IDiet } from "../Interfaces"
import { RootState } from "./store";


const initialFilteredDietsState: IDiet[] = [];

export const filteredDietsSlice = createSlice({
  name: 'filteredDiets',
  initialState: initialFilteredDietsState,
  reducers: {
    setFilteredDiets: (_state, action) => {
      return action.payload;
    }
  }
});

export const { setFilteredDiets } = filteredDietsSlice.actions;

export const selectFilteredDiets = (state : RootState) => state.filteredDiets

export default filteredDietsSlice.reducer;


