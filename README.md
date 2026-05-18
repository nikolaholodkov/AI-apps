# App6 - Linear Regression Predictor

A full-stack web application that demonstrates simple linear regression. Enter training data, and the app will fit a line to the data and make predictions for new X values.

## What is Linear Regression?

Linear regression is a machine learning technique that finds the best-fit straight line through a set of data points. The line equation is:

```
y = mx + b
```

Where:
- **m** = slope (how steep the line is)
- **b** = y-intercept (where the line crosses the Y axis)
- **x** = input value
- **y** = predicted output value

The algorithm minimizes the sum of squared errors between the actual data points and the predicted line.

## Folder Structure

- `frontend/` contains the React app with components for data input and prediction display
- `backend/` contains the Node.js API that performs the linear regression calculations

## Run the App

### Backend

1. Open a terminal in `app6/backend`
2. Run `npm install` (first time only)
3. Run `npm run dev`

The backend runs on `http://localhost:4000`.

### Frontend

1. Open a second terminal in `app6/frontend`
2. Run `npm install` (first time only)
3. Run `npm run dev`

The frontend runs on the Vite development URL (typically `http://localhost:5173`).

## How It Works

### Components

- **App.jsx** - The main component that orchestrates everything
- **DataInput.jsx** - Allows users to view, add, and remove training data points
- **PredictionResult.jsx** - Takes the training data, sends it to the backend, and displays the prediction

### Backend Logic

- **server.js** contains the `/api/predict` endpoint
- It receives training data and an X value
- It calculates the line equation (m and b values)
- It returns the prediction along with the equation

## Example Usage

1. You'll see some example data already loaded (X: 1-5, Y: 2,4,5,6,8)
2. The app has fitted a line to this data
3. Try predicting for X = 6 to see what the next Y value would be
4. Add your own data points and try different predictions

## Key Features

- ✅ Well-commented code with sections for easy understanding
- ✅ Simple and clean UI with responsive design
- ✅ Real-time validation of inputs
- ✅ Example data provided for immediate use
- ✅ Shows the mathematical equation of the fitted line
- ✅ Displays slope and intercept values for technical understanding
