import { useState, useEffect } from 'react'
import { checkAuth, clearError } from '../../store/Auth/authSlice'
import type { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { loginAsync } from '../../store/Auth/AuthAthyncThunk'
import { initializeCSRF } from '../../utils/csrfUtils'
import logoimage from "../../assets/Images/aVQPU59Ss9kqJDYYYDTe2sSe7FLQHMy8l8IfmjgH.png"
import "./LoginPagestyle.css"
import { useNavigate } from 'react-router-dom'

interface LoginError {
  show: boolean
  message: string
}

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<LoginError>({ show: false, message: '' })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading, error } = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    initializeCSRF().catch(console.error)
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    return () => { 
      dispatch(clearError())
      setLoginError({ show: false, message: '' })
    }
  }, [email, password, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    
    setLoginError({ show: false, message: '' })
    
    try {
      const response = await dispatch(loginAsync({ username: email, password })).unwrap()
      if(response.success){
        navigate('/dashboard')
      } else {
        setLoginError({ 
          show: true, 
          message: response.message || 'Invalid email or password. Please try again.' 
        })
      }
    } catch (err: any) {
      setLoginError({ 
        show: true, 
        message: err?.message || 'Login failed. Please check your credentials and try again.' 
      })
    }
  }

  return (
    <>
      

      <div className="login-root">

        <div className="login-panel-left">
          <div className="panel-deco-circle deco-c1" />
          <div className="panel-deco-circle deco-c2" />
          <div className="panel-deco-circle deco-c3" />

          <p className="panel-tag">Welcome back</p>
          <h1 className="panel-headline">
            Your workspace<br />
            <span>starts here.</span>
          </h1>
          <p className="panel-desc">
            Sign in to access your dashboard, manage your projects, and stay on top of everything that matters.
          </p>
          <div className="panel-dots">
            <div className="dot active" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>

        <div className="login-panel-right">
          <div className="login-card">

            <div className="login-logo-wrap">
              <img src={logoimage} alt="Logo" />
            </div>

            <h2 className="login-title">Sign in</h2>
            <p className="login-subtitle">Enter your credentials to continue</p>

            {(error || loginError.show) && (
              <div className="login-error-feedback" style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 15px rgba(238, 90, 111, 0.3)',
                animation: 'shake 0.5s ease-in-out'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Login Failed</div>
                  <div>{loginError.message || error}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="field-wrap">
                <label className={`field-label ${focused === 'email' ? 'active' : ''}`}>Username</label>
                <div className="field-input-wrap">
                  <span className={`field-icon ${focused === 'email' ? 'active' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your username"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="field-wrap">
                <label className={`field-label ${focused === 'password' ? 'active' : ''}`}>Password</label>
                <div className="field-input-wrap">
                  <span className={`field-icon ${focused === 'password' ? 'active' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="remember-row">
                <input type="checkbox" className="custom-checkbox" id="remember" disabled={isLoading} />
                <label className="remember-label" htmlFor="remember">Remember me</label>
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="demo-hint">admin@example.com · password</p>
          </div>
        </div>
      </div>
    </>
  )
}
