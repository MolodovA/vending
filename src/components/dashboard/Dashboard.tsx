import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import style from './dashboard.module.scss';

import { Output } from 'components/dashboard/output/Output';
import { SelectedProduct } from 'components/dashboard/selectedProduct/SelectedProduct';
import { TokenBanknote } from 'components/dashboard/tokenBanknote/TokenBanknote';
import { selectProductList } from 'store/selectors/selectProductList';
import { selectSelectedProduct } from 'store/selectors/selectSelectedProduct';
import { selectTokenBanknote } from 'store/selectors/selectTokenBanknote';

export const Dashboard: FC = () => {
  const takenBanknote = useSelector(selectTokenBanknote);
  const selectedProduct = useSelector(selectSelectedProduct);
  const productList = useSelector(selectProductList);

  return (
    <section className={style.dashboard}>
      <TokenBanknote takenBanknote={takenBanknote} selectedProduct={selectedProduct} />
      <SelectedProduct
        productList={productList}
        takenBanknote={takenBanknote}
        selectedProduct={selectedProduct}
      />
      <Output
        productList={productList}
        takenBanknote={takenBanknote}
        selectedProduct={selectedProduct}
      />
    </section>
  );
};
