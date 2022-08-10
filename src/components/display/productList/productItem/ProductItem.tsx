import React, { FC } from 'react';

import style from 'components/display/productList/productItem/productItem.module.scss';
import { Product } from 'store/reducers/productsSlice';

interface ProductType {
  product: Product;
  takenBanknote: number;
}

export const ProductItem: FC<ProductType> = ({ product, takenBanknote }) => {
  const { price, description, label, id } = product;

  const isAvailableItem =
    takenBanknote >= price ? `${style.product} ${style.active}` : style.product;

  return (
    <li className={isAvailableItem}>
      <h2 className={style.label}>{label}</h2>
      <p className={style.description}>{description}</p>
      <div className={style.price}>
        <span>{price}₽</span>
        <span className={style.id}>{id}</span>
      </div>
    </li>
  );
};
