import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { ProductItem } from 'components/display/productList/productItem/ProductItem';
import style from 'components/display/productList/productList.module.scss';
import { selectProductList } from 'store/selectors/selectProductList';
import { selectTokenBanknote } from 'store/selectors/selectTokenBanknote';

export const ProductList: FC = () => {
  const takenBanknote = useSelector(selectTokenBanknote);
  const productList = useSelector(selectProductList);

  return (
    <ul className={style.list}>
      {productList.map(product => (
        <ProductItem key={product.id} product={product} takenBanknote={takenBanknote} />
      ))}
    </ul>
  );
};
