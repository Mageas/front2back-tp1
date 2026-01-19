
from apps.authentication.models import Users
from apps import db

def test_login_page_load(client):
    response = client.get('/login')
    assert response.status_code in [200, 302]

def test_user_registration_and_login(client, app):
    username = 'testuser'
    email = 'test@example.com'
    password = 'password123'

    with app.app_context():
        user = Users(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

    response = client.post('/login', data=dict(
        username=username,
        password=password
    ), follow_redirects=True)

    assert response.status_code == 200

def test_login_invalid_credentials(client):
    response = client.post('/login', data=dict(
        username='wronguser',
        password='wrongpassword'
    ), follow_redirects=True)

    assert response.status_code == 200
