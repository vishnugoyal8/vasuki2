import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import skillsApi from '../services/skillsApi.js';

export const fetchSkillGaps = createAsyncThunk(
  'skills/fetchSkillGaps',
  async ({ district = 'Pune', industry = 'Automotive / EV', thresholds }, { rejectWithValue }) => {
    try {
      return await skillsApi.getSkillGaps(district, industry, thresholds);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  skillGaps: null,
  thresholds: {
    critical: 85,
    high: 70,
    medium: 50,
  },
  searchTerm: '',
  selectedCategory: 'all',
  loading: false,
  error: null,
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setThresholds: (state, action) => {
      state.thresholds = { ...state.thresholds, ...action.payload };
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillGaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillGaps.fulfilled, (state, action) => {
        state.loading = false;
        state.skillGaps = action.payload;
      })
      .addCase(fetchSkillGaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setThresholds, setSearchTerm, setSelectedCategory } = skillsSlice.actions;
export default skillsSlice.reducer;
