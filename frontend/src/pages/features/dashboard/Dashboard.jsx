import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  // const { logout } = useSelector((state) => state.user);

  const logoutClick = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center">
      <Button onClick={logoutClick}>Logout</Button>
    </div>
  )
}
