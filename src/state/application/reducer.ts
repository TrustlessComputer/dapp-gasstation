import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "./types";
import { RootState } from "@/state";
import { REHYDRATE } from "redux-persist";
import { L2_CHAIN_INFO } from "@/constants/chains";

export const initialState: ApplicationState = {
  isDark: true,
  currentChain: undefined,
};

const appSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    updateCurrentChain: (state, action) => {
      state.currentChain = action.payload;
    },
  },
  extraReducers: {
    [REHYDRATE]: (state) => {
      state.currentChain = L2_CHAIN_INFO;
    },
  },
});

export const { setIsDarkMode, updateCurrentChain } = appSlice.actions;
export const selectApplication = (state: RootState) => state.application;
export default appSlice.reducer;
