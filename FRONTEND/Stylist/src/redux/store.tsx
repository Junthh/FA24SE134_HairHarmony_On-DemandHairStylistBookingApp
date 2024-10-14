import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './Reducer';

export default configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  devTools: true,
});
