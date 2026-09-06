import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import analyticsApi from '../services/analyticsApi.js';

export const fetchDistricts = createAsyncThunk(
  'analytics/fetchDistricts',
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsApi.getDistricts();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchDistrictPlan = createAsyncThunk(
  'analytics/fetchDistrictPlan',
  async (district = 'Pune', { rejectWithValue }) => {
    try {
      return await analyticsApi.getDistrictPlan(district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  districts: [],
  districtPlan: null,
  loading: false,
  error: null,
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDistrictPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistrictPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.districtPlan = action.payload;
      })
      .addCase(fetchDistrictPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
