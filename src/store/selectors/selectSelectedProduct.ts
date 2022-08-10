import { RootState } from 'store/store';

export const selectSelectedProduct = (state: RootState): number =>
  state.products.selectedProduct;
