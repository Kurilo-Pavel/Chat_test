import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./users/userListSlice";

const store = configureStore({
  reducer: {
    users: UserSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;