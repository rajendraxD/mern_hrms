import Button from '@mui/material/Button'
import { useAuth } from "../../../hooks/useAuth";



export default function Dashboard() {
  const { user, logoutUser } = useAuth()

  if (!user) return <h2>Loading...</h2>

  return (
    <>
      <div><pre>{JSON.stringify(user, null, 2)}</pre></div>
      <div>
        <Button variant="contained" color="primary" onClick={logoutUser}>
          Click
        </Button>
      </div>
    </>
  )
}
