import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CredentialInfo, CredentialInfoDefault } from 'models/CredentialInfo.model';

interface AppState {
  loading: boolean;
  activeStep: number;
  credentialInfo: CredentialInfo;
  workShip: {
    [key: string]: { id: string; startTime: string; endTime: string };
  };
}

// Init state
const initialState: AppState = {
  loading: false,
  activeStep: 1,
  credentialInfo: CredentialInfoDefault,
  workShip: {},
};

// reducer callback
const reducers = {
  setLoading(state: AppState, action: PayloadAction<boolean>) {
    state.loading = action.payload;
  },
  setActiveStep(state: AppState, action: PayloadAction<number>) {
    state.activeStep = action.payload;
  },
  setCredentialInfo(state: AppState, action: PayloadAction<CredentialInfo>) {
    state.credentialInfo = action.payload;
  },
  setWorkShip(
    state: AppState,
    action: PayloadAction<{ [key: string]: { id: string; startTime: string; endTime: string } }>,
  ) {
    state.workShip = action.payload;
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const { setLoading, setActiveStep, setCredentialInfo, setWorkShip } = appSlice.actions;

// Selector
export const selectLoading = (state: { app: AppState }) => state.app?.loading;
export const selectCredentialInfo = (state: { app: AppState }) => state.app?.credentialInfo;
export const selectWorkship = (state: { app: AppState }) => state.app?.workShip;

export const appSelector = (state: { app: AppState }) => state.app;
