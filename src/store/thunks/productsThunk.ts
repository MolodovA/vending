import { createAsyncThunk } from '@reduxjs/toolkit';

import { Numbers } from 'enums/Numbers';

const responseData = [
  {
    id: 1,
    label: 'Lay`s',
    description: 'Chips',
    price: 75,
  },
  {
    id: 2,
    label: 'Coca-Cola',
    description: 'Drink',
    price: 180,
  },
  {
    id: 3,
    label: 'Light',
    description: 'Rusks',
    price: 220,
  },
  { id: 4, label: 'Chaka', description: 'Peanut', price: 600 },
  { id: 5, label: 'Water', description: 'Drink', price: 40 },
  { id: 6, label: 'Fanta', description: 'Cold drink', price: 400 },
  { id: 7, label: 'Nutella', description: 'Chocolate paste', price: 550 },
];

const productsAPI = new Promise(resolve => {
  setTimeout(() => {
    resolve(responseData);
  }, Numbers.Delay_1500);
});

export const getProductsData = createAsyncThunk(
  'products/getProductsData',
  async (_, ThunkAPI) => {
    try {
      return await productsAPI;
    } catch (error) {
      return ThunkAPI.rejectWithValue('не удалось загрузить');
    }
  },
);
