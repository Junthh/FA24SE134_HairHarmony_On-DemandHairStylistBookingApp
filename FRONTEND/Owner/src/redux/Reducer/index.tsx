import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CredentialInfo, CredentialInfoDefault } from 'models/CredentialInfo.model';

interface AppState {
  loading: boolean;
  activeStep: number;
  credentialInfo: CredentialInfo;
  roles: {
    [key: string]: { name: string; createdDate: string };
  };
}

// Init state
const initialState: AppState = {
  loading: false,
  activeStep: 1,
  credentialInfo: CredentialInfoDefault,
  roles: {},
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
  setRoles(state: AppState, action: PayloadAction<{}>) {
    state.roles = action.payload;
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const { setLoading, setActiveStep, setCredentialInfo, setRoles } = appSlice.actions;

// Selector
export const selectLoading = (state: { app: AppState }) => state.app?.loading;
export const selectCredentialInfo = (state: { app: AppState }) => state.app?.credentialInfo;
export const selectRoles = (state: { app: AppState }) => state.app?.roles;
export const appSelector = (state: { app: AppState }) => state.app;
