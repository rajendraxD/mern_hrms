import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./stores/slices/user.slice";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { AppBar, Toolbar, Typography, Box, Paper, Container } from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            HRMS
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, flex: 1, pb: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            User Data
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(user, null, 2)}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
