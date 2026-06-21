import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi, profileApi } from "../../api/services";

const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || "Something went wrong";
};

export const getUser = createAsyncThunk("getUser", async (_, { rejectWithValue }) => {
  try {
    const res = await userApi.get();
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await userApi.login(credentials);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
  try {
    const res = await userApi.logout();
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await profileApi.uploadAvatar(formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isLoggingIn: false,
  loginError: null,
  uploadingAvatar: false,
  uploadError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserAvatar: (state, action) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearUploadError: (state) => {
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUser
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // When response.data is null, keep user as null (not logged in)
        // When it's an object, use it as the user
        state.user = action.payload?.data ?? null;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.user = action.payload?.data || action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = action.payload;
      })
      // uploadAvatar
      .addCase(uploadAvatar.pending, (state) => {
        state.uploadingAvatar = true;
        state.uploadError = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.uploadingAvatar = false;
        if (state.user) {
          state.user.avatar = action.payload?.avatar || action.payload?.data?.avatar || action.payload;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.uploadingAvatar = false;
        state.uploadError = action.payload;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { updateUserAvatar, clearLoginError, clearUploadError } = userSlice.actions;
export default userSlice.reducer;
