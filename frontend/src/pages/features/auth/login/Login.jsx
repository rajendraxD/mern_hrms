import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { useIsMobile } from "../../../../hooks/useMobile";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const isMobile = useIsMobile()

  // Clear Redux error when component mounts
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (error) clearError();
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errs.password = "Password is required";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe,
      });
      navigate("/dashboard", { replace: true });
    } catch {
      // error is handled by Redux state
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen px-4 py-8 transition-colors duration-200">
      <div className="w-full max-w-md">

        {/* ---- Card ---- */}
        <div className={`rounded-2xl shadow-lg ${isMobile ? "" : " p-8 border dark:border-slate-700 duration-200"}`}>
          {/* ---- Brand / Header ---- */}
          <div className="text-center mb-8">
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              fontWeight={700}
              className="text-slate-900 dark:text-slate-100 select-none"
            >
              Welcome Back
            </Typography>
            <Typography
              variant={ isMobile ? "body2" : "body1"}
              className="text-slate-500 dark:text-slate-400 mt-1 select-none"
            >
              Sign in to your HRMS account
            </Typography>
          </div>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* ---- Email ---- */}
            <TextField
              fullWidth
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email || " "}
              size={isMobile ? "medium" : "large"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        fontSize="small"
                        className="text-slate-400 dark:text-slate-500"
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                },
              }}
            />

            {/* ---- Password ---- */}
            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password || " "}
              size={isMobile ? "medium" : "large"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined
                        fontSize="small"
                        className="text-slate-400 dark:text-slate-500"
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
                          showPassword
                            ? "Hide password"
                            : "Show password"
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                },
              }}
            />

            {/* ---- Remember Me & Forgot Password ---- */}
            <div className="flex justify-between items-center mb-4 select-none">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size={isMobile ? "small" : "medium"}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    className="text-slate-600 dark:text-slate-400 select-none"
                  >
                    Remember me
                  </Typography>
                }
              />
              <Typography
                variant="body2"
                component={RouterLink}
                to="/forgot-password"
                className="text-blue-600 dark:text-blue-400 hover:underline no-underline"
              >
                Forgot password?
              </Typography>
            </div>

            {/* ---- Submit ---- */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size={isMobile ? "small" : "large"}
              disabled={loading}
              disableElevation
              sx={{
                py: 1.5,
                textTransform: "none", 
                fontWeight: 600,
                fontSize: isMobile ? "0.875rem" : "1rem",
                borderRadius: 2,
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}