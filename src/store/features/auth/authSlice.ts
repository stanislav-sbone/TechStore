import { AUTH_TOKEN_KEY } from '@/constants/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
  userId: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

interface SetCredentialsPayload {
  token: string;
  user: AuthUser;
}

const token = localStorage.getItem(AUTH_TOKEN_KEY);

const initialState: AuthState = {
  token,
  user: null,
  isAuthenticated: Boolean(token),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
