import { Component } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { Navigate } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import BugReportIcon from "@mui/icons-material/BugReport";

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, showDetails: false, navigateHome: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleGoHome = () => {
    this.setState({ navigateHome: true });
  };

  handleReload = () => {
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.navigateHome) {
      return <Navigate to="/" replace />;
    }

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, showDetails } = this.state;
      const isDev = import.meta.env.VITE_NODE_ENV === "development";

      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.50",
            px: 2,
          }}
          role="alert"
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
              p: { xs: 4, sm: 5 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                mx: "auto",
                width: 80,
                height: 80,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(211, 47, 47, 0.08)",
                mb: 3,
              }}
            >
              <ReportProblemIcon
                sx={{ fontSize: 40, color: "error.main" }}
              />
            </Box>

            {/* Heading */}
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Something went wrong
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              An unexpected error occurred. You can go back to the home page
              or refresh to continue.
            </Typography>

            {/* Error details (dev only) */}
            {isDev && error && (
              <Box sx={{ mb: 3, textAlign: "left" }}>
                <Button
                  size="small"
                  startIcon={<BugReportIcon />}
                  onClick={this.toggleDetails}
                  sx={{ textTransform: "none", mb: 1 }}
                >
                  {showDetails ? "Hide" : "Show"} error details
                </Button>
                <Collapse in={showDetails}>
                  <Alert
                    severity="error"
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      "& .MuiAlert-message": { width: "100%" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="monospace"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {error.toString()}
                    </Typography>
                    {error.stack && (
                      <Box
                        component="pre"
                        sx={{
                          fontSize: "0.7rem",
                          fontFamily: "monospace",
                          color: "error.dark",
                          bgcolor: "rgba(211, 47, 47, 0.04)",
                          borderRadius: 1.5,
                          p: 1.5,
                          maxHeight: 180,
                          overflow: "auto",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-all",
                          m: 0,
                          border: "1px solid",
                          borderColor: "rgba(211, 47, 47, 0.12)",
                        }}
                      >
                        {error.stack}
                      </Box>
                    )}
                  </Alert>
                </Collapse>
              </Box>
            )}

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => this.handleGoHome()}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Go to Home
              </Button>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Refresh Page
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
