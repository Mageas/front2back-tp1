
import pytest
from apps import create_app, db
from apps.config import config_dict

@pytest.fixture
def app():
    config = config_dict['Testing']
    app = create_app(config)
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()
