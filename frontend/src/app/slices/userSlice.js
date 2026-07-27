import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/login", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/register", body);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const logoutThunk = createAsyncThunk("user/logout", async () => {
  await api.post("/user/logout");
});

export const refreshTokenThunk = createAsyncThunk(
  "user/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/refreshToken");
      return data;
    } catch {
      return rejectWithValue(null); // silent
    }
  },
);
export const profileThunk = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/me");
      return data;
    } catch {
      return rejectWithValue(null); // silent
    }
  },
);

const initialState = {
  user: null,
  accessToken: null,
  initialized: false,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
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
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.accessToken = action.payload?.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /* ── Register ── */
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

    /* ── Refresh ── */
    builder
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.initialized = true;
        if (!action.payload) return;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.initialized = true;
      });

    /* ── Logout ── */
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });

    /* ── Me ── */
    builder
     builder
      .addCase(profileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        state.initialized = true;
        state.user = action.payload;
      })
      .addCase(profileThunk.rejected, (state) => {
        state.initialized = true;
      });
  },
});

export const { logout, setCredentials } = userSlice.actions;
export default userSlice.reducer;
