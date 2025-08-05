# LifePythonReactFlask

A simple Game of Life web application using a Flask backend (Python) and a React frontend (JavaScript).

## Project Structure

```
lifepythonreact/
├── backend/
│   ├── app.py
│   └── venv/
└── frontend/
    ├── package.json
    └── (React app files)
```

## Prerequisites

- [Python 3.8+](https://www.python.org/downloads/) (for backend)
- [Node.js & npm](https://nodejs.org/) (for frontend)
- [pip](https://pip.pypa.io/en/stable/)

## Backend Setup (Flask)

1. **Open a terminal and navigate to the backend directory:**
    ```bash
    cd ~/Projects/lifepythonreact/backend
    ```

2. **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```bash
    pip install flask flask-cors
    ```

4. **Run the Flask server:**
    ```bash
    python app.py
    ```
    The backend will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Frontend Setup (React)

1. **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd ~/Projects/lifepythonreact/frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the React development server:**
    ```bash
    npm start
    ```
    The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- Visit [http://localhost:3000](http://localhost:3000) in your browser to use the Game of Life UI.
- The React frontend communicates with the Flask backend via the following API endpoints:
    - `GET /api/game-of-life` — Get the current grid state.
    - `POST /api/game-of-life/next` — Advance to the next generation.

## Notes

- Make sure both backend and frontend servers are running simultaneously.
- If you encounter CORS issues, ensure `flask-cors` is installed and `CORS(app)` is called in `app.py`.

---

**Enjoy experimenting with Conway's Game# LifePythonReactFlask

A simple Game of Life web application using a Flask backend (Python) and a React frontend (JavaScript).

## Project Structure

```
lifepythonreact/
├── backend/
│   ├── app.py
│   └── venv/
└── frontend/
    ├── package.json
    └── (React app files)
```

## Prerequisites

- [Python 3.8+](https://www.python.org/downloads/) (for backend)
- [Node.js & npm](https://nodejs.org/) (for frontend)
- [pip](https://pip.pypa.io/en/stable/)

## Backend Setup (Flask)

1. **Open a terminal and navigate to the backend directory:**
    ```bash
    cd ~/Projects/lifepythonreact/backend
    ```

2. **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```bash
    pip install flask flask-cors
    ```

4. **Run the Flask server:**
    ```bash
    python app.py
    ```
    The backend will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Frontend Setup (React)

1. **Open a new terminal and navigate to the frontend directory:**
    ```bash
    cd ~/Projects/lifepythonreact/frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the React development server:**
    ```bash
    npm start
    ```
    The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- Visit [http://localhost:3000](http://localhost:3000) in your browser to use the Game of Life UI.
- The React frontend communicates with the Flask backend via the following API endpoints:
    - `GET /api/game-of-life` — Get the current grid state.
    - `POST /api/game-of-life/next` — Advance to the next generation.

## Notes

- Make sure both backend and frontend servers are running simultaneously.
- If you encounter CORS issues, ensure `flask-cors` is installed and `CORS(app)` is called in `app.py`.

---

**Enjoy experimenting with Conway's Game

