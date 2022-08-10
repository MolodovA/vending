import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';

import style from '../dashboard.module.scss';

import { Input } from 'components/common/input/Input';
import { Numbers } from 'enums/Numbers';
import { useAppDispatch } from 'hooks/hooks';
import { Product, setSelectedProduct } from 'store/reducers/productsSlice';

interface SelectedProductProps {
  takenBanknote: number;
  productList: Product[];
  selectedProduct: number;
}

export const SelectedProduct: FC<SelectedProductProps> = ({
  takenBanknote,
  productList,
  selectedProduct,
}) => {
  const [labelChosenProduct, setLabelChosenProduct] = useState<string>('/');
  const [chosenProduct, setChosenProduct] = useState<string>('');

  const dispatch = useAppDispatch();
  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);
  const isDisable = !(takenBanknote && !selectedProduct);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setChosenProduct(value);
  };

  const setNewLabelChosenProduct = (newLabel: string): void => {
    setLabelChosenProduct(newLabel);
    timeout.current = setTimeout(
      () => setLabelChosenProduct('Choose product'),
      Numbers.Delay_1500,
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const selected = Number(chosenProduct);
    if (selected && selected > Numbers.Zero && selected <= productList.length) {
      if (productList[selected - Numbers.One].price <= takenBanknote) {
        dispatch(setSelectedProduct(selected));
        setLabelChosenProduct('Success');
        setChosenProduct('');
      } else setNewLabelChosenProduct('Not enough money');
    } else setNewLabelChosenProduct('Enter correct product number');
  };

  useEffect(() => {
    if (takenBanknote) {
      setLabelChosenProduct('Choose product');
    } else {
      setLabelChosenProduct('/');
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [takenBanknote]);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor="product">{labelChosenProduct} </label>
      <Input
        id="product"
        onChange={handleChange}
        value={chosenProduct}
        isDisable={isDisable}
      />
    </form>
  );
};
