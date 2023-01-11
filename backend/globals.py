import os
from datetime import datetime
from uuid import uuid4

from backend.consts import RAP_DIR_PATH
from backend.dependencies import backend
from backend.pydantics import Config, UserFile
from backend.utils import convert_bytes

active_sessions = set()
configs = {}
raport = {}

def add_to_active_sessions(session: uuid4):
    active_sessions.add(session)

def remove_from_active_sessions(session: uuid4):
    active_sessions.remove(session)
    if session in configs:
        del configs[session]

def get_active_sessions() -> set:
    return active_sessions

def add_config(session: uuid4, config: Config):
    configs[session] = config

def get_config(session: uuid4) -> Config | None:
    return configs.get(session)

def create_raport(session: uuid4):
    if session not in raport:
        raport[session] = []

def update_raport(session: uuid4, text: str):
    if session in raport:
        raport[session].append(text)

async def get_raport(session: uuid4) -> str | None:
    result = raport.get(session)
    if result:
        location = RAP_DIR_PATH + "raport_" + str(session) + ".txt"
        with open(f"{location}", "w+") as file:
            file.write("".join(result))

        saved_file = UserFile(
            origin_name="raport.txt",
            unique_name="raport.txt",
            location=location,
            type="text/plain",
            size=convert_bytes(os.path.getsize(location)),
            date=str(datetime.now()),
        )
        session_model = await backend.read(session)
        session_model.files += [saved_file]
        await backend.update(session, session_model)

        return location

    return None

