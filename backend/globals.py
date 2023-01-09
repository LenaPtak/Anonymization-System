from uuid import uuid4

active_sessions = set()

def add_to_active_sessions(session: uuid4):
    active_sessions.add(session)

def remove_from_active_sessions(session: uuid4):
    active_sessions.remove(session)

def get_active_sessions() -> set:
    return active_sessions

