import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/services";

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

const initialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
