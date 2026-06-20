// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const getErrorMessage = (error) => {
//   error?.response?.data?.message || error?.message || "Something went wrong";
// };

// export const login = createAsyncThunk("login", async (data, thunkAPI) => {
//   try {
//     const res = await userApi.get(data);
//     return res;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(getErrorMessage(error));
//   }
// });

// const initialState = {
//   user: null,
//   isLoading: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         localStorage.setItem("isLoggedIn", "true");
//         state.isLoading = false;
//       })
//       .addCase(login.rejected, (state) => {
//         state.user = null;
//         localStorage.setItem("isLoggedIn", "false");
//         state.isLoading = false;
//       });
//   },
// });

// export default userSlice.reducer;
