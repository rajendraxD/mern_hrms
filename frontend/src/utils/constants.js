export const API_ENDPOINTS = {
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refreshToken",
  ME: "/user/me",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/change-password",
  FORGOT_PASSWORD: "/user/forgotPassword",
  RESET_PASSWORD: "/user/resetPassword",
};
export const PASSWORD = { MIN: 6, MAX: 30 };

export const VALIDATION = {
  NAME_REQUIRED: "Name is required",
  NAME_LENGTH: "Name must be between 2 and 50 characters",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Email is invalid",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_LENGTH: `Password must be between ${PASSWORD.MIN} and ${PASSWORD.MAX} characters long`,
  EMAIL_PATTERN: /^\S+@\S+\.\S+$/,
  LOADING_LOGIN: "Logging in...",
  LOADING_REGISTER: "Creating account...",
  ERROR_FALLBACK: "Something went wrong",
};

export const ROUTES = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
  DASHBOARD: "/dashboard",
  EMPLOYEES: "/employees",
  LEAVES: "/leaves",
  ATTENDANCE: "/attendance",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword",
};
