import { RootState } from 'store/store';

export const selectTokenBanknote = (state: RootState): number =>
  state.products.takenBanknote;
