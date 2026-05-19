// ============================================================================
// REGRESSION CHART COMPONENT
// ============================================================================
// This component draws:
// 1. A scatter plot of the training points
// 2. The best-fit linear regression line y = mx + b
//
// The chart is rendered with plain SVG so no charting library is required.
// ============================================================================

/**
 * Calculate linear regression coefficients (slope and intercept).
 * @param {Array<{x: number, y: number}>} data
 * @returns {{m: number, b: number}}
 */
function calculateLinearRegression(data) {
  if (!data || data.length < 2) {
    return { m: 0, b: 0 }
  }

  const n = data.length
  const meanX = data.reduce((sum, point) => sum + point.x, 0) / n
  const meanY = data.reduce((sum, point) => sum + point.y, 0) / n

  let numerator = 0
  let denominator = 0

  data.forEach((point) => {
    const xDeviation = point.x - meanX
    numerator += xDeviation * (point.y - meanY)
    denominator += xDeviation * xDeviation
  })

  const m = denominator !== 0 ? numerator / denominator : 0
  const b = meanY - m * meanX

  return { m, b }
}

/**
 * Convert a domain value to a screen coordinate in an SVG chart.
 */
function scale(value, domainMin, domainMax, rangeMin, rangeMax) {
  if (domainMax === domainMin) {
    return (rangeMin + rangeMax) / 2
  }

  return rangeMin + ((value - domainMin) / (domainMax - domainMin)) * (rangeMax - rangeMin)
}

function RegressionChart({ trainingData }) {
  // If there are not enough points to define a line, show an instructional message.
  if (!trainingData || trainingData.length < 2) {
    return (
      <section className="card chart-card">
        <h2>Regression Graph</h2>
        <p className="hint">Add at least 2 points to render the regression line.</p>
      </section>
    )
  }

  const { m, b } = calculateLinearRegression(trainingData)

  // Chart dimensions and paddings for axes labels/ticks.
  const chartWidth = 760
  const chartHeight = 360
  const padding = { top: 24, right: 24, bottom: 44, left: 54 }

  const xs = trainingData.map((point) => point.x)
  const ys = trainingData.map((point) => point.y)

  const rawMinX = Math.min(...xs)
  const rawMaxX = Math.max(...xs)
  const rawMinY = Math.min(...ys)
  const rawMaxY = Math.max(...ys)

  // Add gentle margins around the plotted domain so points do not sit on borders.
  const xPadding = Math.max((rawMaxX - rawMinX) * 0.15, 1)
  const yPadding = Math.max((rawMaxY - rawMinY) * 0.15, 1)

  const minX = rawMinX - xPadding
  const maxX = rawMaxX + xPadding
  const minY = rawMinY - yPadding
  const maxY = rawMaxY + yPadding

  const plotLeft = padding.left
  const plotRight = chartWidth - padding.right
  const plotTop = padding.top
  const plotBottom = chartHeight - padding.bottom

  // Compute the regression line endpoints using the visible x-domain.
  const lineStart = { x: minX, y: m * minX + b }
  const lineEnd = { x: maxX, y: m * maxX + b }

  const lineX1 = scale(lineStart.x, minX, maxX, plotLeft, plotRight)
  const lineY1 = scale(lineStart.y, minY, maxY, plotBottom, plotTop)
  const lineX2 = scale(lineEnd.x, minX, maxX, plotLeft, plotRight)
  const lineY2 = scale(lineEnd.y, minY, maxY, plotBottom, plotTop)

  return (
    <section className="card chart-card">
      <h2>Regression Graph</h2>
      <p className="chart-subtitle">Scatter points with fitted line: y = {m.toFixed(2)}x + ({b.toFixed(2)})</p>

      <div className="chart-wrapper">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="regression-svg"
          role="img"
          aria-label="Scatter plot of training data with linear regression line"
        >
          {/* Plot background rectangle */}
          <rect
            x={plotLeft}
            y={plotTop}
            width={plotRight - plotLeft}
            height={plotBottom - plotTop}
            className="plot-bg"
          />

          {/* Axes */}
          <line x1={plotLeft} y1={plotBottom} x2={plotRight} y2={plotBottom} className="axis" />
          <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} className="axis" />

          {/* Regression line */}
          <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} className="regression-line" />

          {/* Data points */}
          {trainingData.map((point, index) => {
            const cx = scale(point.x, minX, maxX, plotLeft, plotRight)
            const cy = scale(point.y, minY, maxY, plotBottom, plotTop)

            return <circle key={`${point.x}-${point.y}-${index}`} cx={cx} cy={cy} r="5" className="data-point" />
          })}

          {/* Axis labels */}
          <text x={(plotLeft + plotRight) / 2} y={chartHeight - 10} textAnchor="middle" className="axis-label">
            X
          </text>
          <text
            x={18}
            y={(plotTop + plotBottom) / 2}
            textAnchor="middle"
            transform={`rotate(-90 18 ${(plotTop + plotBottom) / 2})`}
            className="axis-label"
          >
            Y
          </text>
        </svg>
      </div>
    </section>
  )
}

export default RegressionChart
