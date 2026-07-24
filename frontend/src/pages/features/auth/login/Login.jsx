import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Button from '@mui/material/Button'
import Divider from "@mui/material/Divider";
import { useIsMobile } from "../../../../hooks/useMobile";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

export default function Login() {
  const [formData, setFormData] = useState({ email: "rajendraxd1@gmail.com", password: "111111" });
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  // ── Handlers ──────────────────────────────────────────
  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    if (name === "email") {
      value = value.toLowerCase();
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await loginUser(formData).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <form onSubmit={handleSubmit} noValidate className={`relative flex flex-col gap-4 overflow-hidden
        ${isMobile
          ? "w-full p-5!"
          : "w-100 p-10!"
        } transition-all duration-50`}
      >

        {/* Shield Watermarks */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          animate={{ y: [0, -6, 0], scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <ShieldOutlined className="text-gray-700/10 dark:text-gray-600/15" sx={{ fontSize: 400 }} />
        </motion.div>



        {/* Google Login Button */}
        <Button variant="outlined" startIcon={<FcGoogle />} size="large" fullWidth disabled>
          Log in with Google
        </Button>

        <Divider> <Chip label="OR" size="small" /></Divider>

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
        <Button variant="contained" color="primary" type="submit" size="large" >
          {"Login"}
        </Button>

        <div className="flex flex-wrap justify-center gap-3">


          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Create an account
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot Password?
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Contact Support
          </Link>
        </div>
      </form>
    </div>
  );
}