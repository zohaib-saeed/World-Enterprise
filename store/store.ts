import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { enterprisesSlice } from "./enterprisesSlice";
import { createWrapper } from "next-redux-wrapper";
import { stepSlice } from "./stepSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [enterprisesSlice.name]: enterprisesSlice.reducer,
      [stepSlice.name]: stepSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
export const store = makeStore()