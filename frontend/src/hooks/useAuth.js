import { useDispatch, useSelector } from "react-redux";
import { login, logout, me } from "../store/slices/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, initialLoading, error } = useSelector(
    (state) => state.user,
  );
  const loginUser = (data) => dispatch(login(data));
  const logoutUser = () => dispatch(logout());
  const userInfo = () => dispatch(me());
  return {
    user,
    loading,
    initialLoading,
    error,
    loginUser,
    logoutUser,
    userInfo,
  };
};

export default useAuth;
