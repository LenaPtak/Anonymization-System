import uvicorn
import logging

from fastapi import FastAPI
from starlette.responses import RedirectResponse
from starlette.middleware.cors import CORSMiddleware

import sys
from os import path
from pathlib import Path

ROOT_DIR = path.dirname(path.dirname(path.abspath(__file__)))
sys.path.insert(1, str(Path(__file__).parent / "./machinelearning"))
sys.path.append(ROOT_DIR)

import globals

from backend.routers import files, sessions, developments, events
from backend.middlewares import middlewares


app = FastAPI()

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(middlewares.Timer)

app.include_router(developments.router)
app.include_router(sessions.router)
app.include_router(events.router)
app.include_router(files.router)


@app.get("/", tags=["Docs"])
async def read_docs():
    """
    Redirect from FastAPI server root to documentation
    """
    return RedirectResponse(url="/docs")


logging.basicConfig(
    format="%(asctime)s - %(message)s",
    datefmt="%m/%d/%Y, %H:%M:%S",
    level=logging.INFO,
)


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)


