import React, { ReactElement, useEffect } from 'react';

import { useSelector } from 'react-redux';

import style from './app.module.scss';

import { Dashboard } from 'components/dashboard/Dashboard';
import { Display } from 'components/display/Display';
import { useAppDispatch } from 'hooks/hooks';
import { selectStatus } from 'store/selectors/selectStatus';
import { getProductsData } from 'store/thunks/productsThunk';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  if (status === 'loading') {
    return <div className={style.loading}>Подождите, идёт загрузка...</div>;
  }
  return (
    <div className={style.app}>
      <Display />
      <Dashboard />
    </div>
  );
};

export default App;
