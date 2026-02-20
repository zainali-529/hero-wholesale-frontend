import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from '../features/banners/bannerSlice';
import categoryReducer from '../features/categories/categorySlice';
import productReducer from '../features/products/productSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    categories: categoryReducer,
    products: productReducer,
    auth: authReducer,
  },
});
