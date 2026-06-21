import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Typography variant="h2" fontWeight={800} color="primary">404</Typography>
      <Typography variant="h6">Page not found.</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
    </Box>
  );
}
