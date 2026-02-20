import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params = {}) => {
  const { keyword, category, pageNumber } = params;
  const response = await api.get('/products', {
    params: { keyword, category, pageNumber },
  });
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
  const response = await api.post('/products', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

export const bulkUploadProducts = createAsyncThunk(
  'products/bulkUploadProducts',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/products/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    page: 1,
    pages: 1,
    status: 'idle',
    error: null,
    bulkUploadStatus: 'idle',
    bulkUploadError: null,
    lastBulkResult: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload);
      })
      .addCase(bulkUploadProducts.pending, (state) => {
        state.bulkUploadStatus = 'loading';
        state.bulkUploadError = null;
        state.lastBulkResult = null;
      })
      .addCase(bulkUploadProducts.fulfilled, (state, action) => {
        state.bulkUploadStatus = 'succeeded';
        state.lastBulkResult = action.payload;
      })
      .addCase(bulkUploadProducts.rejected, (state, action) => {
        state.bulkUploadStatus = 'failed';
        state.bulkUploadError = action.payload || action.error.message;
      });
  },
});

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.items;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const getProductsPage = (state) => state.products.page;
export const getProductsPages = (state) => state.products.pages;
export const getBulkUploadStatus = (state) => state.products.bulkUploadStatus;
export const getBulkUploadError = (state) => state.products.bulkUploadError;
export const getLastBulkResult = (state) => state.products.lastBulkResult;
