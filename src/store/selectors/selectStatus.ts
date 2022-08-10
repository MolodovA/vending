import { RootState } from 'store/store';

export const selectStatus = (state: RootState): string => state.products.status;
