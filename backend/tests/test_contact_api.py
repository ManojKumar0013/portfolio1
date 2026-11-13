# Contact API tests (public URL) + rate-limit unit test with mocked email sender
import os
import sys
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    with open('/app/frontend/.env') as fh:
        for line in fh:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')

VALID = {"name": "TEST_bot", "email": "test_bot@example.com", "message": "TEST_ automated message"}


# Health
def test_health():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200 and r.json() == {"status": "ok"}


# Validation
@pytest.mark.parametrize("payload", [
    {**VALID, "email": "not-an-email"},
    {**VALID, "name": ""},
    {**VALID, "message": "hi"},
    {"name": "x"},
])
def test_contact_validation_422(payload):
    r = requests.post(f"{BASE_URL}/api/contact", json={**payload, "elapsed_ms": 9000})
    assert r.status_code == 422


# Honeypot / bot timing silently accepted (no send)
def test_honeypot_silent():
    r = requests.post(f"{BASE_URL}/api/contact", json={**VALID, "website": "spam.com", "elapsed_ms": 9000})
    assert r.status_code == 200 and r.json() == {"status": "sent"}


def test_fast_submit_silent():
    r = requests.post(f"{BASE_URL}/api/contact", json={**VALID, "elapsed_ms": 100})
    assert r.status_code == 200 and r.json() == {"status": "sent"}


# Rate limit (local, email mocked -> no real sends)
def test_rate_limit_mocked():
    sys.path.insert(0, '/app/backend')
    from fastapi.testclient import TestClient
    import server

    async def fake_send(**kw):
        return "fake-id"

    class FakeColl:
        async def insert_one(self, doc):
            return None

    class FakeDB:
        messages = FakeColl()

    server.send_email = fake_send
    server.db = FakeDB()
    server._hits.clear()
    c = TestClient(server.app)
    h = {"x-forwarded-for": "10.9.9.9"}
    codes = [c.post("/api/contact", json={**VALID, "elapsed_ms": 9000}, headers=h).status_code for _ in range(6)]
    assert codes[:5] == [200] * 5
    assert codes[5] == 429
    # spoofed different XFF bypasses limit (documents behaviour)
    r = c.post("/api/contact", json={**VALID, "elapsed_ms": 9000}, headers={"x-forwarded-for": "1.2.3.4, 10.9.9.9"})
    print("spoofed XFF status:", r.status_code)
