import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userSlice';
import tabsReducer from "./reducers/tabs/tabsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tabs: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;