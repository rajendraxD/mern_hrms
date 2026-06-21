import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { setThemeMode } from "../../stores/slices/theme.slice";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const MODES = [
  { value: "light", label: "Light", icon: <LightModeIcon fontSize="small" /> },
  { value: "auto", label: "Auto", icon: <SettingsBrightnessIcon fontSize="small" /> },
  { value: "dark", label: "Dark", icon: <DarkModeIcon fontSize="small" /> },
];

/**
 * A compact theme-mode toggle.
 *
 * @param {{ variant?: "toggle" | "icon" }} props
 *   - "toggle" (default): segmented button group (light · auto · dark)
 *   - "icon": single icon button that cycles through modes
 */
export default function ThemeSwitcher({ variant = "toggle" }) {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleChange = (_, next) => {
    if (next) dispatch(setThemeMode(next));
  };

  if (variant === "icon") {
    const current = MODES.find((m) => m.value === mode) || MODES[0];
    const modes = MODES.map((m) => m.value);
    const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length];

    return (
      <Tooltip title={`Theme: ${current.label}`}>
        <IconButton
          color="inherit"
          onClick={() => dispatch(setThemeMode(nextMode))}
        >
          {current.icon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{
        bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        borderRadius: 2,
        "& .MuiToggleButton-root": {
          color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
          border: "none",
          px: 1.5,
          transition: "background-color 0.2s ease, color 0.2s ease",
          "&.Mui-selected": {
            color: isDark ? "#fff" : "rgba(0,0,0,0.87)",
            bgcolor: isDark
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.8)",
          },
        },
      }}
    >
      {MODES.map((m) => (
        <ToggleButton key={m.value} value={m.value}>
          {m.icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
