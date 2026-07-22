import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import useAuth from '../../../../hooks/useAuth'

export default function Login() {
  const { login, loading, error, clearError, setError } = useAuth()
  const [form, setForm] = useState({
    email: 'rajendraxd1@gmail.com',
    password: '111111',
  })

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleOnChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <span className="text-2xl font-bold">Login</span>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              required
              fullWidth
              onChange={handleOnChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              required
              minLength={6}
              fullWidth
              onChange={handleOnChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
