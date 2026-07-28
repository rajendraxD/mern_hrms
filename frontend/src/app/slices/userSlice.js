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

export const googleLoginThunk = createAsyncThunk(
  "user/googleLogin",
  async (credential, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/google", { credential });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Google sign-in failed");
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

export const updateProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/user/profile", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed",
      );
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  "user/changePassword",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/user/change-password", body);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password change failed",
      );
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
    setError(state, action) {
      state.error = action.payload;
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

    /* ── Google Login ── */
    builder
      .addCase(googleLoginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /* ── Logout ── */
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });

    /* ── Me ── */
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

    /* ── Update Profile ── */
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    /* ── Change Password ── */
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials, setError } = userSlice.actions;
export default userSlice.reducer;
