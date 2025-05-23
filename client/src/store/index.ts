import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { diffeqApi } from "src/modules/diffeq/api/api";
import simulationReducer from "./simulation.reducer";

const rootReducer = combineReducers({
  simulation: simulationReducer,
  [diffeqApi.reducerPath]: diffeqApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(diffeqApi.middleware),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
