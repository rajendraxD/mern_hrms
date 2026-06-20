import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./stores/slices/user.slice";
import LoadingSpinner from "./components/common/LoadingSpinner";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  if (!user)
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <LoadingSpinner />
    </div>
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
