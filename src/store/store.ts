import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import { productsSlice } from 'store/reducers/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
