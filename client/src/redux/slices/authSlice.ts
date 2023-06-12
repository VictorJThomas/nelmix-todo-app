import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GuestTask = {
  id: string;
  title: string;
  description: string;
}

type Tasks = {
  id: string;
  title: string;
  description: string;
};

interface AuthState {
  user: any;
  token: string | null;
  isGuest: boolean;
  tasks: Tasks[]
  guestTasks: GuestTask[]
}

const initialState: AuthState = {
  user: null,
  token: null,
  isGuest: false,
  tasks: [],
  guestTasks: []
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
    },
    setTasks: (state, action: PayloadAction<{ tasks: Tasks[]}>) => {
      state.tasks = action.payload.tasks;
    },
    addGuestTask: (state, action: PayloadAction<GuestTask>) => {
      state.guestTasks.push(action.payload);
      localStorage.setItem("guestTasks", JSON.stringify(state.guestTasks));
    },
    setGuestTasks: (state, action: PayloadAction<GuestTask[]>) => {
      state.guestTasks = action.payload;
    }
  },
});

export const { setLogin, setLogout, setGuest, setGuestTasks, addGuestTask } = authSlice.actions;

export default authSlice.reducer;
