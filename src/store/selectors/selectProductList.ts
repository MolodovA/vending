import { Product } from 'store/reducers/productsSlice';
import { RootState } from 'store/store';

export const selectProductList = (state: RootState): Product[] =>
  state.products.productList;
