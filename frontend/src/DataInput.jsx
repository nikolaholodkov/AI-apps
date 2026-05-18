// ============================================================================
// DATA INPUT COMPONENT
// ============================================================================
// This component allows users to:
// 1. View and edit the training data points
// 2. Add new data points
// 3. Remove existing data points
//
// The component passes changes back to App.jsx via props so that
// PredictionResult can use the updated data.
// ============================================================================

// Import React helpers for state and events.
import { useState } from 'react'

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================
function DataInput({ trainingData, setTrainingData }) {
  // ---------- STATE MANAGEMENT ----------
  // Store the input values for adding a new data point.
  const [newX, setNewX] = useState('')
  const [newY, setNewY] = useState('')

  // ---------- EVENT HANDLERS ----------

  /**
   * Handle adding a new data point to the training data.
   * Validates inputs and updates the parent component's state.
   */
  const handleAddPoint = () => {
    // Parse the input values as numbers.
    const x = parseFloat(newX)
    const y = parseFloat(newY)

    // Validate that both values are valid numbers.
    if (isNaN(x) || isNaN(y)) {
      alert('Please enter valid numbers for both X and Y.')
      return
    }

    // Add the new point to the training data array.
    setTrainingData([...trainingData, { x, y }])

    // Clear the input fields for the next entry.
    setNewX('')
    setNewY('')
  }

  /**
   * Handle removing a data point from the training data.
   * @param {number} index - The index of the point to remove
   */
  const handleRemovePoint = (index) => {
    // Filter out the point at the specified index.
    const updatedData = trainingData.filter((_, i) => i !== index)
    setTrainingData(updatedData)
  }

  // ---------- RENDER ----------
  return (
    <section className="card data-input">
      <h2>Training Data</h2>

      {/* Display the existing data points in a table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through each training data point and display it */}
            {trainingData.map((point, index) => (
              <tr key={index}>
                <td>{point.x}</td>
                <td>{point.y}</td>
                <td>
                  {/* Button to remove this data point */}
                  <button
                    className="btn-remove"
                    onClick={() => handleRemovePoint(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form to add a new data point */}
      <div className="add-point-form">
        <h3>Add New Point</h3>
        <div className="form-row">
          <div className="form-group">
            <label>X Value:</label>
            <input
              type="number"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              placeholder="Enter X"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Y Value:</label>
            <input
              type="number"
              value={newY}
              onChange={(e) => setNewY(e.target.value)}
              placeholder="Enter Y"
              step="0.1"
            />
          </div>
          <button className="btn-add" onClick={handleAddPoint}>
            Add Point
          </button>
        </div>
      </div>

      {/* Show the count of data points */}
      <p className="data-count">Total data points: {trainingData.length}</p>
    </section>
  )
}

// Export the component so other files can use it.
export default DataInput
