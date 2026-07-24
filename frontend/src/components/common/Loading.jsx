import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box className="flex items-center justify-center h-screen">
      <CircularProgress aria-label="Loading…" />
    </Box>
  );
}
