import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('/categories');
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, categoryData }) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await api.delete(`/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.items.sort((a, b) => a.name.localeCompare(b.name));
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
          state.items.sort((a, b) => a.name.localeCompare(b.name));
        }
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;

export const selectAllCategories = (state) => state.categories.items;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesError = (state) => state.categories.error;
