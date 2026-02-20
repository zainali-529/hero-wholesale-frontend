import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchBanners = createAsyncThunk('banners/fetchBanners', async () => {
  const response = await api.get('/banners');
  return response.data;
});

export const createBanner = createAsyncThunk('banners/createBanner', async (bannerData) => {
  const response = await api.post('/banners', bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const updateBanner = createAsyncThunk('banners/updateBanner', async ({ id, bannerData }) => {
  const response = await api.put(`/banners/${id}`, bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteBanner = createAsyncThunk('banners/deleteBanner', async (id) => {
  await api.delete(`/banners/${id}`);
  return id;
});

const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Banners
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Banner
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Banner
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.items.findIndex((banner) => banner._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Banner
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter((banner) => banner._id !== action.payload);
      });
  },
});

export default bannerSlice.reducer;

export const selectAllBanners = (state) => state.banners.items;
export const getBannersStatus = (state) => state.banners.status;
export const getBannersError = (state) => state.banners.error;
