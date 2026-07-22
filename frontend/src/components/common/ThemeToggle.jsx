import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { setMode } from "../../store/slices/themeSlice";

const options = [
  { value: "light", label: "Light", icon: <LightModeIcon fontSize="small" /> },
  { value: "dark", label: "Dark", icon: <DarkModeIcon fontSize="small" /> },
  {
    value: "system",
    label: "System",
    icon: <SettingsBrightnessIcon fontSize="small" />,
  },
];

const modeIcons = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />,
  system: <SettingsBrightnessIcon />,
};

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value) => {
    dispatch(setMode(value));
    handleClose();
  };

  return (
    <>
      <Tooltip title="Toggle theme">
        <IconButton onClick={handleClick} color="inherit" size="small">
          {modeIcons[mode]}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: { minWidth: 160, mt: 1 },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            selected={mode === opt.value}
            onClick={() => handleSelect(opt.value)}
          >
            <ListItemIcon>{opt.icon}</ListItemIcon>
            <ListItemText>{opt.label}</ListItemText>
            {mode === opt.value && (
              <CheckIcon fontSize="small" sx={{ ml: 1 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
