import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./stores/slices/user.slice";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
