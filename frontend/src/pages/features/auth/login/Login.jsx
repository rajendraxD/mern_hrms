import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
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

// ─────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemFadeSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatAnimation = {
  y: [0, -14, 0],
  transition: {
    duration: 4.5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "mirror",
  },
};

const pulseGlow = {
  boxShadow: [
    "0 0 0 0 rgba(37, 99, 235, 0.15)",
    "0 0 0 12px rgba(37, 99, 235, 0)",
    "0 0 0 0 rgba(37, 99, 235, 0.15)",
  ],
  transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
};

// ─────────────────────────────────────────────────────────
// Inline SVG illustration for the right panel
// ─────────────────────────────────────────────────────────
const Illustration = () => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-w-md mx-auto"
    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.06))" }}
  >
    {/* Background circle */}
    <circle cx="250" cy="250" r="200" fill="url(#grad1)" opacity="0.15" />
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>

    {/* Decorative circles */}
    <motion.circle
      cx="120" cy="120" r="40" fill="#2563eb" opacity="0.08"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="380" cy="380" r="60" fill="#7c3aed" opacity="0.08"
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="380" cy="100" r="25" fill="#06b6d4" opacity="0.08" />
    <circle cx="100" cy="380" r="35" fill="#f59e0b" opacity="0.08" />

    {/* People illustration - abstract HR/team */}
    <g opacity="0.85">
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      >
        <circle cx="200" cy="180" r="28" fill="#2563eb" opacity="0.2" />
        <rect x="180" y="215" width="40" height="55" rx="8" fill="#2563eb" opacity="0.2" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <circle cx="300" cy="180" r="28" fill="#7c3aed" opacity="0.2" />
        <rect x="280" y="215" width="40" height="55" rx="8" fill="#7c3aed" opacity="0.2" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <circle cx="250" cy="140" r="22" fill="#06b6d4" opacity="0.2" />
        <rect x="233" y="168" width="34" height="45" rx="8" fill="#06b6d4" opacity="0.2" />
      </motion.g>

      <line x1="228" y1="195" x2="272" y2="195" stroke="#2563eb" strokeWidth="2" opacity="0.15" />
      <line x1="250" y1="162" x2="250" y2="168" stroke="#06b6d4" strokeWidth="2" opacity="0.15" />
    </g>

    {/* Document / clipboard icon */}
    <g transform="translate(160, 290)" opacity="0.6">
      <rect x="0" y="0" width="40" height="50" rx="4" fill="white" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="12" x2="32" y2="12" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
      <line x1="8" y1="20" x2="32" y2="20" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
      <line x1="8" y1="28" x2="24" y2="28" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
    </g>

    {/* Chart / analytics icon */}
    <g transform="translate(290, 290)" opacity="0.6">
      <rect x="0" y="0" width="50" height="40" rx="4" fill="white" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5" />
      <rect x="6" y="22" width="8" height="12" rx="1" fill="#7c3aed" opacity="0.3" />
      <rect x="18" y="16" width="8" height="18" rx="1" fill="#7c3aed" opacity="0.3" />
      <rect x="30" y="10" width="8" height="24" rx="1" fill="#7c3aed" opacity="0.3" />
    </g>

    {/* Shield icon */}
    <g transform="translate(225, 350)" opacity="0.5">
      <path
        d="M25 0 L50 12 L50 30 C50 42 38 50 25 55 C12 50 0 42 0 30 L0 12 Z"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <motion.path
        d="M15 28 L22 35 L35 20"
        stroke="#06b6d4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
      />
    </g>
  </svg>
);

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear Redux error when component mounts
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ──────────────────────────────────────────
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
    <div className="flex min-h-screen w-full bg-white dark:bg-[#191A23] transition-colors duration-300">
      {/* ── Left Panel – Sign In Form ─────────────────── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`
          flex flex-col justify-center
          w-full lg:w-1/2
          px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24
          py-8 sm:py-12
          bg-white dark:bg-[#191A23]
          border-r-0 lg:border-r-2 border-[#f1f1f1] dark:border-slate-800
          transition-colors duration-300
        `}
      >
        <div className="w-full max-w-[420px] mx-auto">
          {/* ── Logo ──────────────────────────────────── */}
          <motion.div variants={itemFadeSlideUp} className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5 select-none">
              <motion.div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="text-white font-bold text-sm">H</span>
              </motion.div>
              <motion.span
                className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                HRMS
              </motion.span>
            </div>
          </motion.div>

          {/* ── Heading ───────────────────────────────── */}
          <motion.div variants={itemFadeSlideUp} className="mb-8">
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
          </motion.div>

          {/* ── Error Alert ───────────────────────────── */}
          <motion.div variants={itemFadeSlideUp}>
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2, borderRadius: 2 }}
                onClose={clearError}
              >
                {error}
              </Alert>
            )}
          </motion.div>

          {/* ── Form ──────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <motion.div variants={itemFadeSlideUp}>
              <TextField
                fullWidth
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email || " "}
                size="medium"
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
                  mb: 0.5,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                      transition: "border-color 0.2s",
                    },
                    "&:hover fieldset": {
                      borderColor: "#94a3b8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                  },
                }}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemFadeSlideUp}>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                error={!!fieldErrors.password}
                helperText={fieldErrors.password || " "}
                size="medium"
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
                sx={{
                  mb: 0.5,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                      transition: "border-color 0.2s",
                    },
                    "&:hover fieldset": {
                      borderColor: "#94a3b8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2563eb",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    marginLeft: 0,
                  },
                }}
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemFadeSlideUp}
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
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemFadeSlideUp}>
              <motion.div
                animate={pulseGlow}
                style={{ borderRadius: "8px" }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  disableElevation
                  sx={{
                    py: 1.4,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    backgroundColor: "#2563eb",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                    },
                    "&:disabled": {
                      backgroundColor: "#93c5fd",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          {/* ── Sign Up Link ──────────────────────────── */}
          <motion.div
            variants={fadeIn}
            className="mt-6 text-center"
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
          </motion.div>

          {/* ── Footer ────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            className="mt-10 text-center"
          >
            <Typography
              variant="caption"
              className="!text-slate-400 dark:!text-slate-600 !text-xs"
            >
              &copy; {new Date().getFullYear()} HRMS Portal. All rights reserved.
            </Typography>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Panel – Branding / Illustration ────── */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-[#1e1b4b] dark:via-[#1a1a2e] dark:to-[#191A23] items-center justify-center p-8 xl:p-12 transition-colors duration-300"
      >
        <div className="w-full max-w-lg text-center">
          {/* Floating illustration */}
          <motion.div
            animate={floatAnimation}
            className="mb-8"
          >
            <Illustration />
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              className="!text-slate-800 dark:!text-white !text-xl sm:!text-2xl !mt-4 select-none"
            >
              Manage your workforce
            </Typography>
            <Typography
              variant="body1"
              className="!text-slate-500 dark:!text-slate-400 !mt-2 !max-w-sm !mx-auto !text-sm sm:!text-base leading-relaxed select-none"
            >
              HRMS helps you streamline employee management, attendance tracking,
              payroll, and more — all in one place.
            </Typography>
          </motion.div>
        </div>
      </div>
    </div>
  );
}