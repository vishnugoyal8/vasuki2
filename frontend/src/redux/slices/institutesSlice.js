import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import institutesApi from '../services/institutesApi.js';

export const fetchInstitutes = createAsyncThunk(
  'institutes/fetchInstitutes',
  async (district = 'Pune', { rejectWithValue }) => {
    try {
      return await institutesApi.getInstitutes(district);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  institutes: [],
  selectedInstituteId: null,
  loading: false,
  error: null,
};

export const institutesSlice = createSlice({
  name: 'institutes',
  initialState,
  reducers: {
    setSelectedInstituteId: (state, action) => {
      state.selectedInstituteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.institutes = action.payload;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedInstituteId } = institutesSlice.actions;
export default institutesSlice.reducer;
