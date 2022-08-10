import React, { FC } from 'react';

import style from './output.module.scss';

import { Numbers } from 'enums/Numbers';
import { useAppDispatch } from 'hooks/hooks';
import {
  Product,
  setSelectedProduct,
  setTakenBanknote,
} from 'store/reducers/productsSlice';

interface OutputProps {
  takenBanknote: number;
  selectedProduct: number;
  productList: Product[];
}

export const Output: FC<OutputProps> = ({
  takenBanknote,
  selectedProduct,
  productList,
}) => {
  // @ts-ignore
  const { label, description, price } =
    selectedProduct && productList[selectedProduct - Numbers.One];

  const changeOutput = takenBanknote - price;
  const dispatch = useAppDispatch();

  const change = {
    ten: changeOutput / Numbers.Ten || Numbers.Zero,
    five: (changeOutput % Numbers.Ten) / Numbers.Five || Numbers.Zero,
    two: (changeOutput % Numbers.Five) / Numbers.Two || Numbers.Zero,
    one: (changeOutput % Numbers.Five) % Numbers.Two || Numbers.Zero,
  };

  const onResetFormClick = (): void => {
    dispatch(setSelectedProduct(Numbers.Zero));
    dispatch(setTakenBanknote(Numbers.Zero));
  };

  return (
    <div className={style.output}>
      <div className={style.change_output}>
        {selectedProduct ? (
          <>
            {!!change.ten && <span>10₽: {change.ten} coins</span>}
            {!!change.five && <span>5₽: {change.five} coins</span>}
            {!!change.two && <span>2₽: {change.two} coins</span>}
            {!!change.one && <span>1₽: {change.one} coins</span>}
          </>
        ) : (
          ''
        )}
      </div>
      <div className={style.selectedProduct}>
        {selectedProduct ? (
          <div className={style.out} onClick={onResetFormClick}>
            <h3>{label}</h3>
            <p>{description}</p>
            <span>{price}₽</span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
