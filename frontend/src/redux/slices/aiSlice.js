import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import aiApi from '../services/aiApi.js';

export const analyzeJobDescription = createAsyncThunk(
  'ai/analyzeJobDescription',
  async ({ jobDescription, district = 'Pune' }, { rejectWithValue }) => {
    try {
      return await aiApi.analyzeJobDescription(jobDescription, district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  result: null,
  loading: false,
  error: null,
};

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeJobDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeJobDescription.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(analyzeJobDescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult } = aiSlice.actions;
export default aiSlice.reducer;
