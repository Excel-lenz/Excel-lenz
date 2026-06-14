import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PopupProvider } from './context/popupContext.jsx'

createRoot(document.getElementById('root')).render(
  <PopupProvider>
    <App />
  </PopupProvider>
)
