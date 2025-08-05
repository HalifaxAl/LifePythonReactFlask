# LifePythonReactFlask

A simple Game of Life web application using a Flask backend (Python) and a React frontend (JavaScript).

## Project Structure

```
lifepythonreact/
├── backend/
│   ├── app.py
│   ├── test_app.py
│   └── venv/
└── frontend/
    ├── package.json
    └── (React app files)
```

## Prerequisites

- Python 3.8+ (for backend)
- Node.js & npm (for frontend)
- pip

## Backend Setup (Flask)

1. **Navigate to the backend directory:**
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

1. **Navigate to the frontend directory:**
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

## API Endpoints

- `GET /api/game-of-life` — Get the current grid and running status.
- `POST /api/game-of-life/next` — Advance to the next generation (manual step).
- `POST /api/game-of-life/start` — Start the game (auto-advance generations).
- `POST /api/game-of-life/stop` — Stop the game.

## Usage

- Use the UI's **START** and **STOP** buttons to control the game.
- The backend will auto-advance generations when running.
- You can also manually advance with the **Next** button (if implemented).

## Testing

Backend tests are provided in `backend/test_app.py`.  
To run the tests:
```bash
cd ~/Projects/lifepythonreact/backend
source venv/bin/activate
pip install pytest
pytest test_app.py
```

## Notes

- Both backend and frontend servers must be running.
- If you encounter CORS issues, ensure `flask-cors` is installed and `CORS(app)` is called in `app.py`.

---

**Enjoy experimenting with Conway's Game of Life!**