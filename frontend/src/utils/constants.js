export const API_ENDPOINTS = {
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refreshToken",
  ME: "/user/me",
  FORGOT_PASSWORD: "/user/forgotPassword",
  RESET_PASSWORD: "/user/resetPassword",
};
export const PASSWORD = { MIN: 6, MAX: 30 };

export const VALIDATION = {
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Email is invalid",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_LENGTH: `Password must be between ${PASSWORD.MIN} and ${PASSWORD.MAX} characters long`,
  EMAIL_PATTERN: /^\S+@\S+\.\S+$/,
  LOADING: "Logging in...",
  ERROR_FALLBACK: "Something went wrong",
};

export const ROUTES = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  DASHBOARD: "/dashboard",
  REFRESH_TOKEN: "/refreshToken",
  ME: "/me",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword",
};
