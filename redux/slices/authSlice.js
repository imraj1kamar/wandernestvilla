// Redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  activeVillaId: 'all', // 'all' for Super Admin or specific villaId (e.g. 'villa-1')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Default active villa to user's assigned villa or 'all' for admin
      state.activeVillaId = action.payload?.assignedVillaId || 'all';
    },
    setCredentials: (state, action) => {
      const u = action.payload.user || action.payload;
      state.user = u;
      state.isAuthenticated = true;
      state.activeVillaId = u?.assignedVillaId || 'all';
    },
    setActiveVillaId: (state, action) => {
      state.activeVillaId = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.activeVillaId = 'all';
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.activeVillaId = 'all';
    },
  },
});

export const { setUser, setCredentials, setActiveVillaId, clearUser, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectActiveVillaId = (state) => state.auth.activeVillaId;

export default authSlice.reducer;