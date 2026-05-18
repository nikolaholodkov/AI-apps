// ============================================================================
// PREDICTION RESULT COMPONENT
// ============================================================================
// This component allows users to:
// 1. Enter an X value to predict for
// 2. Send the training data and X value to the backend for prediction
// 3. Display the predicted Y value and the fitted line equation
//
// The component handles all data fetching and error handling.
// ============================================================================

// Import React helpers for state and side effects.
import { useState } from 'react'

// ============================================================================
// CONFIGURATION
// ============================================================================
// Store the backend URL for the prediction endpoint.
const PREDICTION_API_URL = 'http://localhost:4000/api/predict'

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================
function PredictionResult({ trainingData }) {
  // ---------- STATE MANAGEMENT ----------
  // Store the X value that the user wants to make a prediction for.
  const [xInput, setXInput] = useState('')
  // Store the prediction result from the backend.
  const [result, setResult] = useState(null)
  // Store any error message if the prediction fails.
  const [error, setError] = useState('')
  // Store loading state to show a loading message while fetching.
  const [loading, setLoading] = useState(false)

  // ---------- EVENT HANDLERS ----------

  /**
   * Handle the predict button click.
   * Sends the training data and X value to the backend and displays the result.
   */
  const handlePredict = async () => {
    // Validate the input
    const x = parseFloat(xInput)
    if (isNaN(x)) {
      setError('Please enter a valid number for X.')
      return
    }

    // Validate that we have enough training data
    if (trainingData.length < 2) {
      setError('Please provide at least 2 data points for linear regression.')
      return
    }

    // Mark loading state as true while we wait for the server.
    setLoading(true)
    // Clear any previous errors or results.
    setError('')
    setResult(null)

    try {
      // Step 1: Send the prediction request to the backend.
      const response = await fetch(PREDICTION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingData,
          x,
        }),
      })

      // Step 2: Check if the server responded successfully.
      if (!response.ok) {
        throw new Error('The backend did not return a successful response.')
      }

      // Step 3: Parse the prediction result from the server.
      const data = await response.json()

      // Step 4: Save the result to display it on the page.
      setResult(data)
    } catch (fetchError) {
      // If something goes wrong, store an error message.
      setError(`Error: ${fetchError.message}`)
    } finally {
      // Mark loading as complete whether the request succeeded or failed.
      setLoading(false)
    }
  }

  // ---------- RENDER ----------
  return (
    <section className="card prediction-result">
      <h2>Make a Prediction</h2>

      {/* Input section for the X value */}
      <div className="predict-form">
        <div className="form-group">
          <label>X Value to Predict:</label>
          <input
            type="number"
            value={xInput}
            onChange={(e) => setXInput(e.target.value)}
            placeholder="Enter X value"
            step="0.1"
            disabled={loading}
          />
        </div>
        <button
          className="btn-predict"
          onClick={handlePredict}
          disabled={loading || trainingData.length < 2}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </div>

      {/* Show loading message */}
      {loading && <p className="loading">Loading prediction...</p>}

      {/* Show error message if something went wrong */}
      {error && <p className="error">{error}</p>}

      {/* Display the prediction result */}
      {result && !loading && (
        <div className="result-box">
          <h3>Prediction Result</h3>

          {/* Display the line equation */}
          <div className="result-item">
            <strong>Line Equation:</strong>
            <p className="equation">{result.equation}</p>
          </div>

          {/* Display the input X value */}
          <div className="result-item">
            <strong>Input X Value:</strong>
            <p>{result.x}</p>
          </div>

          {/* Display the predicted Y value */}
          <div className="result-item">
            <strong>Predicted Y Value:</strong>
            <p className="prediction-value">{result.prediction.toFixed(2)}</p>
          </div>

          {/* Display the slope and intercept for technical understanding */}
          <div className="result-details">
            <p><small>Slope (m): {result.slope.toFixed(4)}</small></p>
            <p><small>Intercept (b): {result.intercept.toFixed(4)}</small></p>
          </div>
        </div>
      )}

      {/* Show a hint if no prediction has been made yet */}
      {!result && !loading && !error && (
        <p className="hint">Enter a value above and click "Predict" to see results.</p>
      )}
    </section>
  )
}

// Export the component so other files can use it.
export default PredictionResult
