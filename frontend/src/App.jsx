import { useState } from "react";
import { userApi } from "./api/services";
import { useEffect } from "react";

export default function App() {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    userApi
      .get()
      .then((response) => {
        const user = response.data;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <div>{JSON.stringify(user)}</div>

  )
}
