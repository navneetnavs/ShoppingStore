import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const saveTokenToStorage = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  }
};

const saveUserToStorage = (user) => {
  if (user) {
    localStorage.setItem('authUser', JSON.stringify(user));
  }
};

const removeTokenFromStorage = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};

const getTokenFromStorage = () => {
  return localStorage.getItem('authToken');
};

const getUserFromStorage = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

const initialState = {
  token: getTokenFromStorage(),
  user: getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Save token and user to localStorage
      saveTokenToStorage(action.payload.token);
      saveUserToStorage(action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      // Remove token from localStorage
      removeTokenFromStorage();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
