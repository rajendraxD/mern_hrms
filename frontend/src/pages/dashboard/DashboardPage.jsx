import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../store/slices/userSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
