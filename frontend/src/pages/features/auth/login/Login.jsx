import { useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField'
import useAuth from '../../../../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "rajendraxd1@gmail.com", password: "111111" });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen'>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <span className='text-2xl font-bold'>Login</span>

            <TextField
              value={form.email}
              onChange={handleInputChange}
              name="email"
              placeholder="Email"
            />

            <TextField
              value={form.password}
              onChange={handleInputChange}
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
