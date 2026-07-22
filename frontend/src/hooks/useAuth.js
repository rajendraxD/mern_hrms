import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  me,
  clearError,
  setError,
} from "../store/slices/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, loading, initialLoading, error, accessToken } = useSelector(
    (state) => state.user,
  );

  const loginUser = useCallback(
    async (credentials) => {
      return dispatch(login(credentials)).unwrap();
    },
    [dispatch],
  );

  const logoutUser = useCallback(async () => {
    return dispatch(logout()).unwrap();
  }, [dispatch]);

  const fetchCurrentUser = useCallback(async () => {
    return dispatch(me()).unwrap();
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const setErrorMessage = useCallback(
    (message) => {
      dispatch(setError(message));
    },
    [dispatch],
  );

  return {
    // state
    user,
    loading,
    initialLoading,
    error,
    accessToken,
    isAuthenticated: !!user,

    // actions
    login: loginUser,
    logout: logoutUser,
    me: fetchCurrentUser,
    clearError: clearAuthError,
    setError: setErrorMessage,
  };
};

export default useAuth;
