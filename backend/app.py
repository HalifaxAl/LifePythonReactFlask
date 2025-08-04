import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows your React app to make requests

GRID_SIZE = 20
grid = [[random.choice([0, 1]) for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]

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

@app.route('/api/game-of-life', methods=['GET'])
def get_grid():
  return jsonify({'grid': grid})

@app.route('/api/game-of-life/next', methods=['POST'])
def next_gen():
  next_generation()
  return jsonify({'grid': grid})

if __name__ == '__main__':
  app.run(debug=True, port=5000)
