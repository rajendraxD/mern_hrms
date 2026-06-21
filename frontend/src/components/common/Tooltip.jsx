import Tooltip from "@mui/material/Tooltip";

export default function TooltipComponent({
  children,
  title,
  placement = "top",
}) {
  return (
    <Tooltip title={title} placement={placement} arrow disableInteractive>
      {children}
    </Tooltip>
  );
}
