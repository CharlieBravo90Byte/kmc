import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import Admin from '../src/pages/Admin'

createRoot(document.getElementById('admin-root')).render(
  <StrictMode>
    <Admin />
  </StrictMode>,
)
