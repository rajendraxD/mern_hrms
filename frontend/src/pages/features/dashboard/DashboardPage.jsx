import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import { getAvatarUrl } from "../../../utils/getAvatarUrl";
import { userApi } from "../../../api/services";

// Icons
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: (t) =>
        t.palette.mode === "dark"
          ? "0 4px 20px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 8px 30px rgba(0,0,0,0.4)"
            : "0 8px 30px rgba(0,0,0,0.1)",
      },
      position: "relative",
      overflow: "visible",
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ lineHeight: 1.2, mb: 0.5 }}
          >
            {value ?? <Skeleton width={60} />}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {trend !== undefined && (
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
              label={`${trend > 0 ? "+" : ""}${trend}%`}
              size="small"
              color={trend >= 0 ? "success" : "error"}
              variant="outlined"
              sx={{ mt: 1, fontWeight: 600, fontSize: "0.7rem" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: `${color}.lighter` || `${color}.main`,
            color: `${color}.main`,
            flexShrink: 0,
            ml: 2,
            background: (t) =>
              `linear-gradient(135deg, ${t.palette[color]?.main || color}22, ${t.palette[color]?.light || color}11)`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

function WelcomeSection({ user, onRefresh, loading }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: (t) =>
          t.palette.mode === "dark"
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -80,
          left: -30,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 2 }}>
              {getGreeting()}
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, mb: 0.5 }}>
              {user?.name || "User"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Welcome to your HRMS dashboard. Here's what's happening today.
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                icon={<Diversity3Icon sx={{ fontSize: 16 }} />}
                label={user?.role === "admin" ? "Administrator" : "Team Member"}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontWeight: 500,
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />
              <Chip
                icon={<CalendarMonthIcon sx={{ fontSize: 16 }} />}
                label={new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontWeight: 500,
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />
            </Box>
          </Box>
          <Tooltip title="Refresh data">
            <IconButton
              onClick={onRefresh}
              disabled={loading}
              sx={{
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

function RecentUsersCard({ users, loading }) {
  if (loading) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={140} height={32} />
          <Skeleton variant="text" width="100%" height={48} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="100%" height={48} />
          <Skeleton variant="text" width="100%" height={48} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(0,0,0,0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Recent Members
          </Typography>
          <Chip
            label={`${users?.length || 0} new`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {users && users.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {users.map((u, i) => (
              <Box
                key={u._id || i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Avatar
                  src={getAvatarUrl(u.avatar)}
                  alt={u.name}
                  sx={{ width: 40, height: 40, fontSize: "1rem", fontWeight: 600 }}
                >
                  {u.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {u.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {u.email}
                  </Typography>
                </Box>
                <Chip
                  label={u.role}
                  size="small"
                  color={u.role === "admin" ? "warning" : "default"}
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.65rem",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
              color: "text.disabled",
            }}
          >
            <GroupAddIcon sx={{ fontSize: 48, mb: 1, opacity: 0.4 }} />
            <Typography variant="body2" color="text.secondary">
              No recent members yet
            </Typography>
          </Box>
        )}
      </CardContent>
      {users && users.length > 0 && (
        <>
          <Divider />
          <Box sx={{ p: 1.5, textAlign: "center" }}>
            <Button
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              View all members
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}

function RoleDistributionCard({ stats, loading }) {
  const total = stats?.totalUsers || 1;
  const adminPct = Math.round(((stats?.adminCount || 0) / total) * 100);
  const userPct = Math.round(((stats?.userCount || 0) / total) * 100);

  if (loading) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={160} height={32} />
          <Skeleton variant="text" width="100%" height={24} sx={{ mt: 2 }} />
          <Skeleton variant="text" width="100%" height={24} />
          <Skeleton variant="text" width="100%" height={24} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(0,0,0,0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Role Distribution
        </Typography>

        <Box sx={{ mt: 3 }}>
          {/* Admin */}
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AdminPanelSettingsIcon fontSize="small" color="warning" />
                <Typography variant="body2" fontWeight={500}>
                  Admins
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {stats?.adminCount || 0}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={adminPct}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #f59e0b, #f97316)",
                },
              }}
            />
          </Box>

          {/* Users */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" color="primary" />
                <Typography variant="body2" fontWeight={500}>
                  Users
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {stats?.userCount || 0}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={userPct}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                },
              }}
            />
          </Box>
        </Box>

        {/* Quick stats summary */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <CheckCircleOutlinedIcon fontSize="small" color="success" />
          <Typography variant="body2" color="text.secondary">
            {total} total {total === 1 ? "member" : "members"} in the system
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  const actions = [
    { label: "Add Employee", icon: <PersonIcon />, color: "primary" },
    { label: "View Reports", icon: <TrendingUpIcon />, color: "success" },
    { label: "Manage Roles", icon: <AdminPanelSettingsIcon />, color: "warning" },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, mt: 2, flexWrap: "wrap" }}>
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="outlined"
              startIcon={action.icon}
              size="small"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                flex: { xs: "1 1 100%", sm: "1 1 auto" },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useSelector((state) => state.user);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await userApi.getStats();
      setStats(res.data?.data || null);
    } catch {
      // Silently fail — dashboard still shows user info
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box sx={{ height: "100%", overflow: "auto", pb: 4 }}>
      {/* Welcome Section */}
      <WelcomeSection user={user} onRefresh={fetchStats} loading={loading} />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Members"
            value={stats?.totalUsers ?? 0}
            icon={<PeopleAltIcon sx={{ fontSize: 28 }} />}
            color="primary"
            subtitle="Across all roles"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Administrators"
            value={stats?.adminCount ?? 0}
            icon={<AdminPanelSettingsIcon sx={{ fontSize: 28 }} />}
            color="warning"
            subtitle="System admins"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Team Members"
            value={stats?.userCount ?? 0}
            icon={<PersonIcon sx={{ fontSize: 28 }} />}
            color="info"
            subtitle="Regular users"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Today"
            value="—"
            icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
            color="success"
            subtitle="Coming soon"
          />
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <RoleDistributionCard stats={stats} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentUsersCard users={stats?.recentUsers} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <QuickActionsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
