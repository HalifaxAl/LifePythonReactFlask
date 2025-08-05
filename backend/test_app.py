import pytest
from app import app, GRID_SIZE

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_grid(client):
    response = client.get('/api/game-of-life')
    assert response.status_code == 200
    data = response.get_json()
    assert 'grid' in data
    assert len(data['grid']) == GRID_SIZE

def test_next_generation(client):
    response1 = client.get('/api/game-of-life')
    grid_before = response1.get_json()['grid']
    response2 = client.post('/api/game-of-life/next')
    assert response2.status_code == 200
    grid_after = response2.get_json()['grid']
    assert isinstance(grid_after, list)
    assert len(grid_after) == GRID_SIZE

def test_start_and_stop(client):
    response = client.post('/api/game-of-life/start')
    assert response.status_code == 200
    assert response.get_json()['running'] is True

    response = client.post('/api/game-of-life/stop')
    assert response.status_code == 200
    assert response.get_json()['running'] is False