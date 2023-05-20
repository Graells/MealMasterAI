import { createAction, createSlice } from "@reduxjs/toolkit"

import { IDiet } from "../Interfaces"
import { RootState } from "./store";


const initialLastCreatedDietState: IDiet = {
  id:0,
  userId: "",
  user: {
    id:0,
    auth0Id:"",
    email:"",
    userName:"",
    userPic:"",
    meals:[]
  },
  description: "",
  createdAt: new Date(),
  mealInfoId: 0,
  mealInfo: {
    id:0,
    mealAI:[],
    title:"",
    name: "",
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    activityLevel: "",
    dietaryPreferences: "",
    weightGoal: "",
    weightAmount: 0,
    timeFrame: 0,
    eatingFrequency: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

export const lastCreatedDietSlice = createSlice({
  name: 'initialLastCreatedDiet',
  initialState: initialLastCreatedDietState,
  reducers: {
    setLastCreatedDiet: (_state, action) => {
      return action.payload;
    }
  }
});

export const { setLastCreatedDiet } = lastCreatedDietSlice.actions;

export const selectLastCreatedDiet = (state : RootState) => state.lastCreatedDiet

export default lastCreatedDietSlice.reducer;
