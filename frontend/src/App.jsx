// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
// This is the root component of the application. Its only job is to:
// 1. Import child components (DataInput and PredictionResult)
// 2. Manage shared state for training data
// 3. Arrange them in the layout
//
// All the data-fetching and prediction logic has been moved to separate,
// reusable components.
// ============================================================================

// Import React helpers for state.
import { useState } from 'react'
// Import the DataInput component (allows user to enter training data).
import DataInput from './DataInput'
// Import the PredictionResult component (displays predictions).
import PredictionResult from './PredictionResult'
// Import the chart component (visualizes data points and fitted line).
import RegressionChart from './RegressionChart'

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================
function App() {
  // ---------- STATE MANAGEMENT ----------
  // Store the training data that the user enters.
  // This is shared state that both child components need access to.
  const [trainingData, setTrainingData] = useState([
    // Provide some example data so users can see how it works immediately
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 6 },
    { x: 5, y: 8 },
  ])

  // ========== RENDER ==========
  // This component arranges two child components on the page.
  // DataInput lets users modify the training data.
  // PredictionResult uses that data to make predictions.
  return (
    <main className="page">
      {/* Header section */}
      <header className="header">
        <h1>Linear Regression Predictor</h1>
        <p>Enter training data, and the app will predict future values using linear regression.</p>
      </header>

      {/* Container for both components */}
      <div className="container">
        {/* Display the data input component */}
        <DataInput trainingData={trainingData} setTrainingData={setTrainingData} />
        {/* Display the prediction result component */}
        <PredictionResult trainingData={trainingData} />
      </div>

      {/* Display the regression graph below the main two-column section */}
      <RegressionChart trainingData={trainingData} />
    </main>
  )
}

// Export the component so main.jsx can render it.
export default App
