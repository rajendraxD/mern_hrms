import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading({ message = "Loading HRMS Portal...", fullScreen = false }) {
  return (
    <Box
      className={
        `flex flex-col items-center justify-center ${fullScreen ? "min-h-screen" : "py-12"} bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4`
      }
    >
      <Box className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg animate-pulse">
        H
      </Box>
      <CircularProgress size={36} thickness={4} className="text-indigo-600 mb-3" />
      <Typography variant="body2" className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
        {message}
      </Typography>
    </Box>
  );
}
