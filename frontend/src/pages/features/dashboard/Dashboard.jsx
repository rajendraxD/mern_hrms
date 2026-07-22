import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LuggageIcon from "@mui/icons-material/Luggage";
import PaymentsIcon from "@mui/icons-material/Payments";

const stats = [
  { label: "Total Employees", value: "156", icon: <PeopleIcon />, color: "#4f46e5" },
  { label: "Present Today", value: "142", icon: <CalendarMonthIcon />, color: "#0ea5e9" },
  { label: "On Leave", value: "8", icon: <LuggageIcon />, color: "#f59e0b" },
  { label: "Payroll (MTD)", value: "$284K", icon: <PaymentsIcon />, color: "#10b981" },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: `${stat.color}14`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
