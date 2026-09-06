import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesApi from '../services/coursesApi.js';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await coursesApi.getCourses();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCourseAlignment = createAsyncThunk(
  'courses/fetchCourseAlignment',
  async (courseId = 'COURSE_ITI_EV_TECH', { rejectWithValue }) => {
    try {
      return await coursesApi.getCourseAlignment(courseId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  courses: [],
  alignment: null,
  selectedCourseId: 'COURSE_ITI_EV_TECH',
  loading: false,
  error: null,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseAlignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseAlignment.fulfilled, (state, action) => {
        state.loading = false;
        state.alignment = action.payload;
      })
      .addCase(fetchCourseAlignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCourseId } = coursesSlice.actions;
export default coursesSlice.reducer;
