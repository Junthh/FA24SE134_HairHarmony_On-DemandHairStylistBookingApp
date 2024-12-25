import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CredentialInfo, CredentialInfoDefault } from 'models/CredentialInfo.model';

interface AppState {
  loading: boolean;
  activeStep: number;
  credentialInfo: CredentialInfo;
  roles: {
    [key: string]: { name: string; createdDate: string };
  };
  categorys: {
    [key: string]: { name: string; createdDate: string };
  };
  services: {
    [key: string]: { name: string; createdDate: string };
  };
  workShip: {
    [key: string]: { id: string; startTime: string; endTime: string };
  };
  stylists: {
    [key: string]: { id: string; fullName: string };
  };
}

// Init state
const initialState: AppState = {
  loading: false,
  activeStep: 1,
  credentialInfo: CredentialInfoDefault,
  roles: {},
  categorys: {},
  services: {},
  workShip: {},
  stylists: {},
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
  setCategorys(state: AppState, action: PayloadAction<{}>) {
    state.categorys = action.payload;
  },
  setServices(state: AppState, action: PayloadAction<{}>) {
    state.services = action.payload;
  },
  setWorkShip(
    state: AppState,
    action: PayloadAction<{ [key: string]: { id: string; startTime: string; endTime: string } }>,
  ) {
    state.workShip = action.payload;
  },
  setStylists(state: AppState, action: PayloadAction<{}>) {
    state.stylists = action.payload;
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const {
  setLoading,
  setActiveStep,
  setCredentialInfo,
  setRoles,
  setCategorys,
  setServices,
  setStylists,
  setWorkShip,
} = appSlice.actions;

// Selector
export const selectLoading = (state: { app: AppState }) => state.app?.loading;
export const selectCredentialInfo = (state: { app: AppState }) => state.app?.credentialInfo;
export const selectRoles = (state: { app: AppState }) => state.app?.roles;
export const selectCategorys = (state: { app: AppState }) => state.app?.categorys;
export const selectWorkship = (state: { app: AppState }) => state.app?.workShip;
export const selectStylist = (state: { app: AppState }) => state.app?.stylists;

export const selectServices = (state: { app: AppState }) => state.app?.services;

export const appSelector = (state: { app: AppState }) => state.app;
