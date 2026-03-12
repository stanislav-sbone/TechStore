import { AUTH_TOKEN_KEY } from '@/constants/auth';
import type { User } from '@/types/users';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface SetCredentialsPayload {
  token: string;
  user: User;
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setUser, updateUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
