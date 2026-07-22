import Button from '@mui/material/Button'
import useAuth from '../../../hooks/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>Dashboard
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
