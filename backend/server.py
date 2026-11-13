import os
import time
import uuid
import logging
from html import escape
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from email_service import send_email, EMAIL_FROM_NAME

logging.basicConfig(level=logging.INFO)

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api = APIRouter(prefix="/api")

RATE_WINDOW = 3600
RATE_MAX = 5
_hits: dict[str, list[float]] = {}


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    message: str = Field(min_length=5, max_length=3000)
    website: str = ""
    elapsed_ms: int = 0


def _rate_limited(ip: str) -> bool:
    now = time.time()
    if len(_hits) > 5000:
        _hits.clear()
    hits = [t for t in _hits.get(ip, []) if now - t < RATE_WINDOW]
    _hits[ip] = hits
    if len(hits) >= RATE_MAX:
        return True
    hits.append(now)
    return False


def _template(name: str, email: str, message: str) -> str:
    msg = escape(message).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#111">'
        f'<p style="font-size:12px;letter-spacing:2px;color:#ff5b1f;margin:0 0 12px">NEW MESSAGE / PORTFOLIO</p>'
        f'<p style="margin:0 0 4px"><strong>From:</strong> {escape(name)}</p>'
        f'<p style="margin:0 0 16px"><strong>Email:</strong> {escape(email)}</p>'
        f'<div style="padding:16px;border-left:3px solid #ff5b1f;background:#f6f4ef">{msg}</div>'
        f'<p style="font-size:12px;color:#888;margin-top:24px">Sent by {escape(EMAIL_FROM_NAME)} contact form. '
        'Hit reply to answer the sender directly.</p></td></tr></table>'
    )


@api.get("/")
async def root():
    return {"status": "ok"}


@api.post("/contact")
async def contact(body: ContactIn, request: Request):
    if body.website or body.elapsed_ms < 2500:
        return {"status": "sent"}
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "?").split(",")[-1].strip()
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many messages. Try again later.")
    subject = f"Portfolio message from {body.name.strip()[:60]}"
    email_id = await send_email(to=OWNER_EMAIL, subject=subject,
                                html=_template(body.name.strip(), body.email, body.message.strip()),
                                reply_to=body.email)
    await db.messages.insert_one({
        "message_id": str(uuid.uuid4()),
        "name": body.name.strip(),
        "email": body.email,
        "message": body.message.strip(),
        "email_id": email_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"status": "sent"}


app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown():
    client.close()
