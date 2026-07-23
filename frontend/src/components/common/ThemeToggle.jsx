import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import { setMode } from "../../store/slices/themeModeSlice";

/**
 * ThemeToggle — switches between light, dark, and system mode.
 * Uses the Redux theme slice for state management and persistence.
 */
const ThemeToggle = ({ iconButtonProps, tooltipProps }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const resolved = useSelector((state) => state.theme.resolved);

  // Cycle: light → dark → system → light
  const nextMode = useMemo(() => {
    const order = ["light", "dark", "system"];
    const idx = order.indexOf(mode);
    return order[(idx + 1) % order.length];
  }, [mode]);

  const handleToggle = useCallback(() => {
    dispatch(setMode(nextMode));
  }, [dispatch, nextMode]);

  const icon = useMemo(() => {
    if (mode === "system") {
      // Show resolved theme icon when in system mode
      if (resolved === "dark") {
        return <DarkModeIcon fontSize="small" />;
      }
      return <LightModeIcon fontSize="small" />;
    }
    if (mode === "dark") return <DarkModeIcon fontSize="small" />;
    return <LightModeIcon fontSize="small" />;
  }, [mode, resolved]);

  const tooltipTitle = useMemo(() => {
    if (mode === "system") return `System (${resolved}) — Click for light`;
    if (mode === "light") return "Light — Click for dark";
    return "Dark — Click for system";
  }, [mode, resolved]);

  return (
    <Tooltip title={tooltipTitle} arrow {...tooltipProps}>
      <IconButton
        onClick={handleToggle}
        aria-label="Toggle theme"
        color="inherit"
        sx={{
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "rotate(15deg)",
          },
        }}
        {...iconButtonProps}
      >
        {mode === "system" && (
          <BrightnessAutoIcon
            sx={{
              fontSize: 18,
              position: "absolute",
              bottom: 0,
              right: 0,
              opacity: 0.6,
            }}
          />
        )}
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;