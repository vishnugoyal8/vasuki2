import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employersApi from '../services/employersApi.js';

export const fetchEmployers = createAsyncThunk(
  'employers/fetchEmployers',
  async (district = 'Pune', { rejectWithValue }) => {
    try {
      return await employersApi.getEmployers(district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchEmployerFeedback = createAsyncThunk(
  'employers/fetchFeedback',
  async (_, { rejectWithValue }) => {
    try {
      return await employersApi.getEmployerFeedback();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const submitEmployerFeedback = createAsyncThunk(
  'employers/submitFeedback',
  async (feedbackData, { rejectWithValue }) => {
    try {
      return await employersApi.submitEmployerFeedback(feedbackData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  employers: [],
  feedbackList: [],
  submitResult: null,
  loading: false,
  submitting: false,
  error: null,
};

export const employersSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {
    clearSubmitResult: (state) => {
      state.submitResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployers.fulfilled, (state, action) => {
        state.loading = false;
        state.employers = action.payload;
      })
      .addCase(fetchEmployers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployerFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackList = action.payload;
      })
      .addCase(fetchEmployerFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitEmployerFeedback.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitEmployerFeedback.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitResult = action.payload;
        if (action.payload?.feedback) {
          state.feedbackList.unshift(action.payload.feedback);
        }
      })
      .addCase(submitEmployerFeedback.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmitResult } = employersSlice.actions;
export default employersSlice.reducer;
