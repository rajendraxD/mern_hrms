import { logoutThunk } from "../../../app/slices/userSlice";
import { Button } from "../../../components/ui/button";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const dispatch = useDispatch(); 7
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutThunk());
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Button variant="destructive" onClick={handleLogout}>Logout</Button>
    </div>
  )
}
