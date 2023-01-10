from uuid import uuid4

active_sessions = set()
configs = {}

def add_to_active_sessions(session: uuid4):
    active_sessions.add(session)

def remove_from_active_sessions(session: uuid4):
    active_sessions.remove(session)
    del configs[session]

def get_active_sessions() -> set:
    return active_sessions

def add_config(session: uuid4, config: dict):
    configs[session] = config

def get_config(session: uuid4) -> dict | None:
    return configs.get(session)
