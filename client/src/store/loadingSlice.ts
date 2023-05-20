import { createAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "./store";


const initialLoadingState: boolean = false;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    setLoading: (_state, action) => {
      return action.payload;
    }
  }
});

export const { setLoading } = loadingSlice.actions;

export const selectLoading = (state : RootState) => state.loading

export default loadingSlice.reducer;

