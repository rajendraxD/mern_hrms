import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import useAuth from '../../../../hooks/useAuth'

export default function Login() {
  const { login, loading, error, clearError, setError } = useAuth()

  useEffect(() => {
    clearError()
  }, [clearError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await login({ email, password })
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
              required
              fullWidth
              value={'rajendraxd1@gmail.com'}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              required
              minLength={6}
              fullWidth
              value={'111111'}
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
