import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginThunk, googleLoginThunk, setError } from "@/app/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Building2,
  Clock,
  Wallet,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const features = [
  { icon: Clock, title: "Attendance", desc: "Track time-off, shifts, and clock-ins" },
  { icon: Wallet, title: "Payroll", desc: "Automated salary calculations" },
  { icon: TrendingUp, title: "Performance", desc: "Reviews, goals, and feedback" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.user);
  const loading = status === "loading";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [remember, setRemember] = useState(false);

  const handleOnChange = (e) => {
    dispatch(setError(null));
    fieldErrors[e.target.name] && setFieldErrors({});
    let { name, value } = e.target;
    if (name === "email") value = value.toLowerCase();
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password || form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await dispatch(loginThunk(form));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    const credential = params.get("id_token") || params.get("credential");
    if (credential) {
      window.location.hash = "";
      dispatch(googleLoginThunk(credential));
    }
  }, [dispatch]);

  const handleGoogleLogin = () => {
    const redirectUri = window.location.origin + "/login";
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      response_type: "id_token",
      redirect_uri: redirectUri,
      scope: "openid email profile",
      nonce: Math.random().toString(36),
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background p-3 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.7_0.1_260/0.08),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_oklch(0.7_0.1_150/0.06),_transparent_50%)]" />
      <motion.div
        className="w-full max-w-sm md:max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-0 p-0 shadow-xl shadow-black/5">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="relative hidden overflow-hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-[oklch(0.7_0.1_150/0.08)]" />
              <div className="absolute inset-0 bg-[linear-gradient(oklch(0_0_0/0.03)_1px,transparent_1px),linear-gradient(90deg,oklch(0_0_0/0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              <div className="absolute -left-40 -top-40 size-80 rounded-full bg-primary/5 blur-[120px]" />
              <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-emerald-500/10 blur-[100px]" />
              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                    <Building2 className="size-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight">
                    Build a better workplace
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground max-w-xs">
                    Everything you need to manage your team — from onboarding
                    to payroll and beyond.
                  </p>
                </div>

                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {features.map((f) => (
                    <motion.div
                      key={f.title}
                      className="flex gap-2.5"
                      variants={itemVariants}
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background/60 shadow-sm">
                        <f.icon className="size-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">{f.title}</p>
                        <p className="text-xs text-muted-foreground">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="flex items-center gap-2 rounded-lg border bg-background/40 px-3 py-2 backdrop-blur-sm">
                  <ShieldCheck className="size-3.5 shrink-0 text-emerald-500" />
                  <p className="text-xs text-muted-foreground">
                    SOC 2 compliant &bull; End-to-end encrypted
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8">
              <FieldGroup>
                <motion.div
                  className="flex flex-col items-center gap-1 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Building2 className="size-3.5" />
                    </div>
                    <span className="text-base font-semibold tracking-tight">HRMS</span>
                  </div>
                  <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
                  <p className="text-balance text-xs text-muted-foreground">
                    Sign in to your account
                  </p>
                </motion.div>

                {error && (
                  <motion.div
                    className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        className="pl-10 transition-shadow focus-visible:shadow-[0_0_0_1px_var(--ring)]"
                        value={form.email}
                        onChange={handleOnChange}
                        aria-invalid={!!fieldErrors.email}
                      />
                    </div>
                    {fieldErrors.email && (
                      <motion.p
                        className="text-xs text-destructive"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {fieldErrors.email}
                      </motion.p>
                    )}
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="pl-10 pr-10 transition-shadow focus-visible:shadow-[0_0_0_1px_var(--ring)]"
                        value={form.password}
                        onChange={handleOnChange}
                        aria-invalid={!!fieldErrors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <motion.p
                        className="text-xs text-destructive"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {fieldErrors.password}
                      </motion.p>
                    )}
                  </Field>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={setRemember}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-normal leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  <Field>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </Field>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <Field>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleLogin}
                      type="button"
                    >
                      <svg className="size-4 mr-2 shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Sign in with Google
                    </Button>
                  </Field>
                </motion.div>

                <motion.p
                  className="text-center text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Link>
                </motion.p>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <motion.p
          className="mt-3 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          By signing in, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>.
        </motion.p>
      </motion.div>
    </div>
  );
}
