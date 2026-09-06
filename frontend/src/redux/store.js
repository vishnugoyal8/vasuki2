import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice.js';
import skillsReducer from './slices/skillsSlice.js';
import coursesReducer from './slices/coursesSlice.js';
import jobsReducer from './slices/jobsSlice.js';
import employersReducer from './slices/employersSlice.js';
import institutesReducer from './slices/institutesSlice.js';
import recommendationsReducer from './slices/recommendationsSlice.js';
import analyticsReducer from './slices/analyticsSlice.js';
import aiReducer from './slices/aiSlice.js';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    skills: skillsReducer,
    courses: coursesReducer,
    jobs: jobsReducer,
    employers: employersReducer,
    institutes: institutesReducer,
    recommendations: recommendationsReducer,
    analytics: analyticsReducer,
    ai: aiReducer,
  },
});

export default store;
