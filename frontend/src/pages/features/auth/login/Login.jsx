import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

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
    <div className="flex justify-center items-center w-full h-screen">
      {/* <Button variant="contained" color="primary">
        Click
      </Button> */}
    </div>
  );
}