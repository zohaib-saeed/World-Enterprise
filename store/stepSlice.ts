import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { STEP } from "./types";

export interface StepState {
  stepState: STEP;
}

const initialState: StepState = {
  stepState: STEP.INDEX,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStepState(state, action) {
      console.log(action)
      state.stepState = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.step,
      };
    },
  },
});

export const { setStepState } = stepSlice.actions;

export const selectStepState = (state: AppState) => state.step.stepState;

export default stepSlice.reducer;