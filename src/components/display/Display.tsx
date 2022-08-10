import React, { FC } from 'react';

import style from './display.module.scss';

import { ProductList } from 'components/display/productList/ProductList';

export const Display: FC = () => (
  <section className={style.display}>
    <ProductList />
  </section>
);
