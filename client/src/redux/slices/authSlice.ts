import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  token: string | null;
  isGuest: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isGuest: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isGuest = false;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isGuest = false;
    },
    setGuest: (state) => {
      state.user = null;
      state.token = null;
      state.isGuest = true;
    }
  },
});

export const { setLogin, setLogout, setGuest } = authSlice.actions;

export default authSlice.reducer;
