import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BookingProvider } from './store/BookingProvider.tsx'
import { ToastProvider } from './components/feedback/ToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BookingProvider>
  </StrictMode>,
)
