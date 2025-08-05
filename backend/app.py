import random
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
  # This allows your React app to make requests

GRID_SIZE = 20
grid = [[random.choice([0, 1]) for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]

# Game running state and threading
game_running = False
game_thread = None
game_lock = threading.Lock()

def count_neighbors(row, col):
    count = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if i == 0 and j == 0:
                continue
            neighbor_row = (row + i + GRID_SIZE) % GRID_SIZE
            neighbor_col = (col + j + GRID_SIZE) % GRID_SIZE
            count += grid[neighbor_row][neighbor_col]
    return count

def next_generation():
    global grid
    new_grid = [[0 for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            neighbors = count_neighbors(row, col)
            if grid[row][col] == 1:
                if neighbors < 2 or neighbors > 3:
                    new_grid[row][col] = 0  # Dies
                else:
                    new_grid[row][col] = 1  # Survives
            else:
                if neighbors == 3:
                    new_grid[row][col] = 1  # Becomes alive
    grid = new_grid

def game_loop():
    global game_running
    while game_running:
        with game_lock:
            next_generation()
        time.sleep(0.5)  # Adjust speed as needed

@app.route('/api/game-of-life', methods=['GET'])
def get_grid():
    with game_lock:
        return jsonify({'grid': grid, 'running': game_running})

@app.route('/api/game-of-life/next', methods=['POST'])
def next_gen():
    with game_lock:
        next_generation()
        return jsonify({'grid': grid})

@app.route('/api/game-of-life/start', methods=['POST'])
def start_game():
    global game_running, game_thread
    if not game_running:
        game_running = True
        game_thread = threading.Thread(target=game_loop, daemon=True)
        game_thread.start()
    return jsonify({'status': 'started', 'running': game_running})

@app.route('/api/game-of-life/stop', methods=['POST'])
def stop_game():
    global game_running
    game_running = False
    return jsonify({'status': 'stopped', 'running': game_running})

@app.route('/api/game-of-life/set', methods=['POST'])
def set_grid():
    global grid
    data = request.get_json()
    if 'grid' in data:
        grid = data['grid']
        return jsonify({'status': 'ok', 'grid': grid})
    return jsonify({'status': 'error', 'message': 'No grid provided'}), 400

@app.route('/api/game-of-life/clear', methods=['POST'])
def clear_grid():
    global grid, game_running
    game_running = False
    grid = [[0 for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]
    return jsonify({'status': 'cleared', 'grid': grid, 'running': game_running})

if __name__ == '__main__':
    app.run(debug=True, port=5000)