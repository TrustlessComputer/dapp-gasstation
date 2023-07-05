import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationState } from './types';
import {RootState} from "@/state";

export const initialState: ApplicationState = {
  isDark: true,
  currentChain: undefined,
};

const appSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
    updateCurrentChain: (state, action) => {
      state.currentChain = action.payload;
    },
  },
});

export const { setIsDarkMode, updateCurrentChain } = appSlice.actions;
export const selectApplication = (state: RootState) => state.application;
export default appSlice.reducer;
