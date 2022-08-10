import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProductsData } from 'store/thunks/productsThunk';

export interface Product {
  id: number;
  label: string;
  description: string;
  price: number;
}

type Status = 'idle' | 'loading' | 'resolved' | 'rejected';

interface ProductsState {
  status: Status;
  error: string;
  takenBanknote: number;
  selectedProduct: number;
  productList: Product[];
}

const initialState: ProductsState = {
  status: 'idle',
  error: '',
  takenBanknote: 0,
  selectedProduct: 0,
  productList: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setTakenBanknote: (state, { payload }: PayloadAction<number>) => {
      state.takenBanknote = payload;
    },
    setSelectedProduct: (state, { payload }: PayloadAction<number>) => {
      state.selectedProduct = payload;
    },
  },
  extraReducers: {
    [getProductsData.pending.type]: state => {
      state.status = 'loading';
    },
    [getProductsData.fulfilled.type]: (state, { payload }: PayloadAction<Product[]>) => {
      state.status = 'resolved';
      state.productList = payload;
    },
    [getProductsData.rejected.type]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { setSelectedProduct, setTakenBanknote } = productsSlice.actions;
export default productsSlice.reducer;
