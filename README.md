# StockV8 - Stock Portfolio Dashboard

This project is a web application that allows users to track stocks, view their portfolio, and get AI-powered recommendations. It consists of a React frontend and a Node.js backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js and npm (or yarn)
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-url>
    cd StockV8
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

The backend server requires an API key from Alpha Vantage to fetch stock data.

1.  Navigate to the `backend` directory:
    ```bash
    cd ../backend
    ```

2.  Create a `.env` file:
    ```bash
    touch .env
    ```

3.  Open the `.env` file and add your Alpha Vantage API key as follows:
    ```
    ALPHAVANTAGE_API_KEY=YOUR_API_KEY
    ```
    Replace `YOUR_API_KEY` with your actual Alpha Vantage API key.

### Running the Application

You will need to run both the frontend and backend servers simultaneously in separate terminals.

1.  **Start the backend server:**
    Open a terminal in the `backend` directory and run:
    ```bash
    npm start
    ```
    The backend server will start on `http://localhost:3001`.

2.  **Start the frontend server:**
    Open another terminal in the `frontend` directory and run:
    ```bash
    npm start
    ```
    The frontend application will start on `http://localhost:3000`.

You can now view the application by opening `http://localhost:3000` in your browser.