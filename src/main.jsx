import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { worker } from './mocks/browser.js'
import './index.css'
import App from './App.jsx'

worker.start()

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/AgGrid">
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
