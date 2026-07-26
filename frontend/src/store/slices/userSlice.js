import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/axios";
import { API_ENDPOINTS } from "../../utils/constants";

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const registerThunk = createAsyncThunk(
  "register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post(API_ENDPOINTS.REGISTER, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loginThunk = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const res = await api.post(API_ENDPOINTS.LOGIN, data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const logoutThunk = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const res = await api.post(API_ENDPOINTS.LOGOUT);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateUserProfileThunk = createAsyncThunk(
  "updateUserProfile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(API_ENDPOINTS.ME);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  "changePassword",
  async (data, thunkAPI) => {
    try {
      const res = await api.put(API_ENDPOINTS.CHANGE_PASSWORD, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);
export const refreshTokenThunk = createAsyncThunk(
  "refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // Use a fresh axios instance to bypass the `api` response interceptor.
      // The interceptor would catch 401s and try its own retry, which
      // would interfere with the refresh endpoint's cookie-based auth.
      const res = await axios.get(
        "http://localhost:5000/api/user/refreshToken",
        { withCredentials: true },
      );
      return res.data;
    } catch {
      return rejectWithValue(null); // silent – user not logged in
    }
  },
);

const initialState = {
  user: null,
  accessToken: null,
  initialLoading: true,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
    },
    setCredentials(state, action) {
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });

    builder
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user || action.payload;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.status = "idle";
        state.changePasswordSuccess = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });

    /* ── Refresh ── */
    builder
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.initialLoading = false;
        if (!action.payload) return;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.initialLoading = false;
      });
  },
});

export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
