import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobsApi from '../services/jobsApi.js';

export const fetchMarketIntelligence = createAsyncThunk(
  'jobs/fetchMarketIntelligence',
  async ({ role = 'EV Technician', district = 'Pune' } = {}, { rejectWithValue }) => {
    try {
      return await jobsApi.getMarketIntelligence(role, district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  marketIntelligence: null,
  selectedRole: 'EV Technician',
  loading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketIntelligence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketIntelligence.fulfilled, (state, action) => {
        state.loading = false;
        state.marketIntelligence = action.payload;
      })
      .addCase(fetchMarketIntelligence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedRole } = jobsSlice.actions;
export default jobsSlice.reducer;
