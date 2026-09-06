import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardApi from '../services/dashboardApi.js';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (district = 'Pune', { rejectWithValue }) => {
    try {
      return await dashboardApi.getStats(district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const resetData = createAsyncThunk(
  'dashboard/resetData',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardApi.resetSeedData();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  stats: null,
  selectedDistrict: 'Pune',
  loading: false,
  error: null,
  toastMessage: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
    clearToastMessage: (state) => {
      state.toastMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetData.fulfilled, (state) => {
        state.toastMessage = 'Demo dataset reset to fresh baseline.';
      });
  },
});

export const { setSelectedDistrict, setToastMessage, clearToastMessage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
