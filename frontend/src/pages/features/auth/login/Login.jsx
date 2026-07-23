import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../store/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "rajendraxd1@gmail.com", password: "111111" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ── Handlers ──────────────────────────────────────────
  const handleChange = (e) => {
    setFormError(null)
    let { name, value } = e.target;
    if (name === "email") {
      value = value.toLowerCase();
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (data) => {
    const errors = {};
    if (!data.email || !validateEmail(data.email)) {
      errors.email = "Valid email is required";
    }
    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (data.password.length > 20) {
      errors.password = "Password must be at most 20 characters";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const [formError, setFormError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormError(null);

    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      const message = typeof err === "string" ? err : "Login failed";
      setFormError(message);
    }
  };

  return (
    <div className="flex min-h-screen w-full transition-colors duration-300">
      {/* ── Left Panel – Sign In Form ─────────────────── */}
      <div
        className={`
          flex flex-col justify-center
          w-full
          px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24
          py-8 sm:py-12
          border-r-0 lg:border-r-2
          transition-colors duration-300
        `}
      >
        <div className="w-full max-w-100 mx-auto">
          {/* ── Logo ──────────────────────────────────── */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5 select-none">
              <div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md"
              >
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span
                className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight"
              >
                HRMS
              </span>
            </div>
          </div>

          {/* ── Heading ───────────────────────────────── */}
          <div className="mb-8">
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              className="text-slate-900 dark:text-white !text-2xl sm:!text-[28px] select-none"
            >
              Sign in
            </Typography>
            <Typography
              variant="body2"
              className="!text-slate-500 dark:!text-slate-400 !mt-1.5 select-none !text-sm sm:!text-base"
            >
              to continue to HRMS Portal
            </Typography>
          </div>

          {/* ── Error Alert ───────────────────────────── */}
          {/* <div>
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2, borderRadius: 2 }}
                onClose={clearError}
              >
                {error}
              </Alert>
            )}
          </div> */}
          {/* Inline error */}
          {formError && (
            <div className="mb-3 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div >
              <TextField
                fullWidth
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || " "}
                size="medium"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined
                          fontSize="small"
                          color="inherit"
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Password */}
            <div >
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || " "}
                size="medium"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined
                          fontSize="small"
                          color="inherit"
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size="small"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div
              className="flex justify-between items-center mb-5 select-none"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                    color="primary"
                    sx={{
                      color: "#cbd5e1",
                      "&.Mui-checked": {
                        color: "#2563eb",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    className="!text-slate-600 dark:!text-slate-400 select-none !text-sm"
                  >
                    Remember me
                  </Typography>
                }
              />
              <Typography
                variant="body2"
                component={RouterLink}
                to="/forgot-password"
                className="!text-blue-600 dark:!text-blue-400 hover:underline !no-underline !text-sm font-medium"
              >
                Forgot password?
              </Typography>
            </div>

            {/* Submit Button */}
            <div >
              <div

                style={{ borderRadius: "8px" }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  disableElevation
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* ── Sign Up Link ──────────────────────────── */}
          <div className="mt-6 text-center"
          >
            <Typography
              variant="body2"
              className="!text-slate-500 dark:!text-slate-400 !text-sm"
            >
              Don't have an account?{" "}
              <Typography
                component={RouterLink}
                to="/register"
                className="!text-blue-600 dark:!text-blue-400 hover:underline !font-medium !text-sm"
              >
                Sign up
              </Typography>
            </Typography>
          </div>

          {/* ── Footer ────────────────────────────────── */}
          <div
            className="mt-10 text-center"
          >
            <Typography
              variant="caption"
              className="!text-slate-400 dark:!text-slate-600 !text-xs"
            >
              &copy; {new Date().getFullYear()} HRMS Portal. All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}