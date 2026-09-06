import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recommendationsApi from '../services/recommendationsApi.js';

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (filters = {}, { rejectWithValue }) => {
    try {
      return await recommendationsApi.getRecommendations(filters);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateRecommendationStatus = createAsyncThunk(
  'recommendations/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await recommendationsApi.updateRecommendationStatus(id, status);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  recommendations: [],
  filters: {
    priority: 'all',
    status: 'all',
    district: 'all',
  },
  loading: false,
  error: null,
};

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendationFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRecommendationStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        if (updated) {
          const idx = state.recommendations.findIndex(
            (r) => r.recommendationId === updated.recommendationId
          );
          if (idx !== -1) {
            state.recommendations[idx] = updated;
          }
        }
      });
  },
});

export const { setRecommendationFilters } = recommendationsSlice.actions;
export default recommendationsSlice.reducer;
