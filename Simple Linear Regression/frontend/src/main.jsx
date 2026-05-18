// ============================================================================
// MAIN ENTRY POINT
// ============================================================================
// This file initializes the React application and mounts it to the DOM.
// ============================================================================

// Import React's strict mode helper for development checks.
import { StrictMode } from 'react'
// Import the function that mounts React into the browser page.
import { createRoot } from 'react-dom/client'
// Import the top-level App component.
import App from './App.jsx'
// Import the page styles.
import './App.css'

// ============================================================================
// REACT ROOT INITIALIZATION
// ============================================================================
// Find the HTML element that React should control.
const rootElement = document.getElementById('root')

// Create a React root and render the app into the page.
createRoot(rootElement).render(
  // Use StrictMode to help catch common React issues while developing.
  <StrictMode>
    {/* Render the single application component. */}
    <App />
  </StrictMode>,
)
