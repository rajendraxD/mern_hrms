import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../../../store/slices/userSlice";
import { ROUTES, VALIDATION, PASSWORD } from "../../../../utils/constants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";

export default function Login() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = VALIDATION.EMAIL_REQUIRED;
    else if (!VALIDATION.EMAIL_PATTERN.test(formData.email)) errs.email = VALIDATION.EMAIL_INVALID;
    if (!formData.password) errs.password = VALIDATION.PASSWORD_REQUIRED;
    else if (formData.password.length < PASSWORD.MIN || formData.password.length > PASSWORD.MAX)
      errs.password = VALIDATION.PASSWORD_LENGTH;
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.promise(dispatch(login(formData)).unwrap(), {
      loading: VALIDATION.LOADING,
      error: (res) => res || VALIDATION.ERROR_FALLBACK,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 w-full sm:w-96 p-5 sm:p-10"
      >
        <Button variant="outlined" startIcon={<FcGoogle />} size="large" color="inherit" fullWidth disabled>
          Log in with Google
        </Button>

        <Divider><Chip label="OR" size="small" /></Divider>

        <TextField
          fullWidth name="email" type="email" autoComplete="email" autoFocus
          label="Email" value={formData.email} onChange={handleChange}
          error={!!errors.email} helperText={errors.email}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" color="inherit" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password" label="Password"
          value={formData.password} onChange={handleChange}
          error={!!errors.password} helperText={errors.password}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" color="inherit" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end" size="small"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button variant="contained" color="primary" type="submit" size="large" disabled={loading}>
          Login
        </Button>

        <div className="flex flex-wrap justify-center gap-3">
          <Link component="button" variant="body2" color="inherit" onClick={() => navigate(ROUTES.REGISTER)}>
            Don't have an account?
          </Link>
          <Link component="button" variant="body2" color="inherit" onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
