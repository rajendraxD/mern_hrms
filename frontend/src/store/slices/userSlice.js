import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/user/login", data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const res = await api.post("/user/logout");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
export const me = createAsyncThunk("me", async (_, thunkAPI) => {
  try {
    const res = await api.get("/user/me");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const initialState = {
  user: null,
  loading: false,
  initialLoading: true,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(me.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.initialLoading = false;
        state.user = action.payload.user;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.initialLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser, setError } = userSlice.actions;
export default userSlice.reducer;
