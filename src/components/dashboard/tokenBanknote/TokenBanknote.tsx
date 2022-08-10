import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';

import { Input } from 'components/common/input/Input';
import style from 'components/dashboard/dashboard.module.scss';
import { Numbers } from 'enums/Numbers';
import { useAppDispatch } from 'hooks/hooks';
import { setTakenBanknote } from 'store/reducers/productsSlice';

interface TokenBanknoteProps {
  takenBanknote: number;
  selectedProduct: number;
}

export const TokenBanknote: FC<TokenBanknoteProps> = ({
  takenBanknote,
  selectedProduct,
}) => {
  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [labelMoney, setLabelMoney] = useState<string>('Insert money');
  const [valueMoney, setValueMoney] = useState<string>('');
  const dispatch = useAppDispatch();

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValueMoney(value);
  };

  const setNewLabelMoney = (totalAmountMoney = takenBanknote): void => {
    if (totalAmountMoney) {
      setLabelMoney(`Inserted money: ${totalAmountMoney}₽`);
    } else {
      setLabelMoney('Insert money');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const reg = /^(50|100|200|500)$/;
    if (valueMoney && reg.test(valueMoney)) {
      const totalAmountMoney = takenBanknote + Number(valueMoney);
      dispatch(setTakenBanknote(totalAmountMoney));
      setNewLabelMoney(totalAmountMoney);
    } else {
      setLabelMoney('Money is not accepted');
      timeout.current = setTimeout(setNewLabelMoney, Numbers.Delay_1500);
    }
  };

  useEffect(() => {
    if (!takenBanknote && !selectedProduct) {
      setLabelMoney('Insert money');
      setValueMoney('');
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [takenBanknote, selectedProduct]);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor="money">{labelMoney} </label>
      <Input
        id="money"
        onChange={onHandleChange}
        value={valueMoney}
        isDisable={!!selectedProduct}
      />

      <p className={style.info}>
        Available banknotes: 50, 100, 200 or 500 ₽. The machine gives change in 1, 2, 5
        and 10 ₽ coins.
      </p>
      <div />
    </form>
  );
};
