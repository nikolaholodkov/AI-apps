// ============================================================================
// APP6 BACKEND - LINEAR REGRESSION API
// ============================================================================
// This backend provides an API for simple linear regression predictions.
// Linear regression fits a line (y = mx + b) to data points and makes
// predictions for new X values.
// ============================================================================

// Import Express so this file can create a web server.
const express = require('express');
// Import CORS so the React frontend can call this API from another port.
const cors = require('cors');

// ============================================================================
// APPLICATION SETUP
// ============================================================================
// Create the Express application object.
const app = express();
// Pick a port, but still allow an environment variable to override it.
const PORT = process.env.PORT || 4000;

// Allow requests from the frontend during development.
app.use(cors());
// Allow the server to understand JSON request bodies.
app.use(express.json());

// ============================================================================
// LINEAR REGRESSION HELPER FUNCTIONS
// ============================================================================

/**
 * Performs linear regression on a dataset and returns the line equation.
 *
 * Linear regression finds the best-fit line y = mx + b by minimizing
 * the sum of squared errors between actual and predicted values.
 *
 * @param {Array<{x: number, y: number}>} data - Array of data points
 * @returns {Object} Object containing slope (m) and intercept (b)
 */
function linearRegression(data) {
  // Handle edge cases
  if (data.length < 2) {
    return { m: 0, b: 0 };
  }

  // Calculate the mean (average) of X and Y values
  const n = data.length;
  const meanX = data.reduce((sum, point) => sum + point.x, 0) / n;
  const meanY = data.reduce((sum, point) => sum + point.y, 0) / n;

  // Calculate the slope (m) using the formula:
  // m = Σ((x - meanX) * (y - meanY)) / Σ((x - meanX)²)
  let numerator = 0;   // Sum of (x - meanX) * (y - meanY)
  let denominator = 0; // Sum of (x - meanX)²

  data.forEach((point) => {
    const xDeviation = point.x - meanX;
    numerator += xDeviation * (point.y - meanY);
    denominator += xDeviation * xDeviation;
  });

  // Calculate slope (avoid division by zero)
  const m = denominator !== 0 ? numerator / denominator : 0;

  // Calculate intercept using the formula:
  // b = meanY - m * meanX
  const b = meanY - m * meanX;

  return { m, b };
}

/**
 * Predicts Y value for a given X value using the line equation.
 *
 * @param {number} x - The X value to make a prediction for
 * @param {number} m - The slope of the line
 * @param {number} b - The intercept of the line
 * @returns {number} The predicted Y value
 */
function predict(x, m, b) {
  // Apply the linear equation: y = mx + b
  return m * x + b;
}

// ============================================================================
// API ROUTES
// ============================================================================

/**
 * POST /api/predict
 * Accepts training data and an X value, then returns a prediction.
 *
 * Request body:
 * {
 *   "trainingData": [
 *     { "x": 1, "y": 2 },
 *     { "x": 2, "y": 4 },
 *     { "x": 3, "y": 5 }
 *   ],
 *   "x": 4
 * }
 *
 * Response:
 * {
 *   "prediction": 7,
 *   "slope": 2.5,
 *   "intercept": -0.5,
 *   "equation": "y = 2.5x + (-0.5)"
 * }
 */
app.post('/api/predict', (req, res) => {
  try {
    // Step 1: Extract the training data and X value from the request
    const { trainingData, x } = req.body;

    // Step 2: Validate that we received valid data
    if (!trainingData || !Array.isArray(trainingData) || trainingData.length === 0) {
      return res.status(400).json({
        error: 'Invalid trainingData. Must be a non-empty array of {x, y} objects.',
      });
    }

    if (typeof x !== 'number') {
      return res.status(400).json({
        error: 'Invalid x value. Must be a number.',
      });
    }

    // Step 3: Fit the linear regression model to the training data
    const { m, b } = linearRegression(trainingData);

    // Step 4: Make a prediction for the given X value
    const prediction = predict(x, m, b);

    // Step 5: Send the results back to the frontend
    res.json({
      prediction,         // The predicted Y value
      slope: m,           // The slope of the fitted line
      intercept: b,       // The Y-intercept of the fitted line
      equation: `y = ${m.toFixed(2)}x + (${b.toFixed(2)})`, // Human-readable equation
      x,                  // Echo back the X value
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error in /api/predict:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request.',
    });
  }
});

// ============================================================================
// SERVER STARTUP
// ============================================================================
// Start the server and print the local URL.
app.listen(PORT, () => {
  // Log a message so it is obvious that the backend started correctly.
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/predict`);
});
