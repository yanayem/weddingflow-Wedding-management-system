import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

// Ensure light mode is the default and remove any stale dark mode classes
document.documentElement.classList.remove('dark');
localStorage.removeItem('theme');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" />
      <App />
    </AuthProvider>
  </StrictMode>,
)
