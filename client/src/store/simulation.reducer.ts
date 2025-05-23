import { createSlice } from "@reduxjs/toolkit";
import { DiffEqResponse } from "src/modules/diffeq/api/types";
import { DiffEqMethod, Point } from "src/modules/diffeq/types";

interface SimulationState {
  params: {
    sourceFExpr: string;
    method: DiffEqMethod;
    h: string; // x step
    steps: number;
    startingPoint: Point;
    epsilon: string | null;
  };
  realFExpr: string | null;
  result: DiffEqResponse | null;
  importModalShown: boolean;
}

const initialState: SimulationState = {
  params: {
    sourceFExpr: "",
    method: DiffEqMethod.EULER,
    h: "0.1",
    steps: 2,
    startingPoint: { x: "0", y: "0" },
    epsilon: null,
  },
  realFExpr: null,
  result: null,
  importModalShown: false,
};

const interpolationSlice = createSlice({
  name: "interpolation",
  initialState,
  reducers: {
    setSourceFExpr: (state, action) => {
      state.params.sourceFExpr = action.payload;
    },
    setMethod: (state, action) => {
      state.params.method = action.payload;
    },
    setH: (state, action) => {
      state.params.h = action.payload;
    },
    setSteps: (state, action) => {
      state.params.steps = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setImportModalShown: (state, action) => {
      state.importModalShown = action.payload;
    },
    setStartingPoint: (state, action) => {
      state.params.startingPoint = action.payload;
    },
    setRealFExpr: (state, action) => {
      state.realFExpr = action.payload;
    },
    setEpsilon: (state, action) => {
      state.params.epsilon = action.payload;
    },
  },
});

export const {
  setSourceFExpr,
  setMethod,
  setH,
  setImportModalShown,
  setResult,
  setSteps,
  setStartingPoint,
  setEpsilon,
  setRealFExpr,
} = interpolationSlice.actions;
export default interpolationSlice.reducer;
