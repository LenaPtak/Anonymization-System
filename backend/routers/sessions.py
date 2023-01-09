from time import time
from uuid import UUID, uuid4
from fastapi import Depends, HTTPException, Response, status, APIRouter

from backend.pydantics import UserSession
from backend.utils import delete_files_from_storage
from backend.dependencies import backend, cookie, verifier
from backend.globals import add_to_active_sessions, remove_from_active_sessions, get_active_sessions

router = APIRouter(prefix="/api", tags=["Sessions"])


@router.post("/session")
async def create_session(response: Response):
    """
    Creates new user session.
    Returns response with initial data details.
    """
    session_id = uuid4()
    created_at = time()

    initial_data = {
        "files_available": False,
        "config_available": False,
        "created_at": created_at,
        "updated_at": created_at,
        "files": [],
    }
    session = UserSession(**initial_data)
    add_to_active_sessions(session_id)

    await backend.create(session_id, session)
    cookie.attach_to_response(response, session_id)

    return session


@router.get("/session", dependencies=[Depends(cookie)])
async def read_session(session_data: UserSession = Depends(verifier)):
    """
    Returns response with current session details.
    """
    return session_data


@router.get("/sessions")
async def read_sessions():
    """
    Returns response with all sessions in details.
    """
    sessions = []
    for session in get_active_sessions():
        data = await backend.read(session)
        if not data:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT)
        sessions.append(data.dict())

    return {"sessions": sessions}


@router.delete("/session")
async def delete_session(response: Response, session_id: UUID = Depends(cookie)):
    """
    Deletes current user session.
    Returns response with deleted session details.
    """
    session = await backend.read(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No session correlated with given cookie",
        )
    expired_files = [file.unique_name for file in session.files]
    delete_files_from_storage(files_to_delete=expired_files)

    await backend.delete(session_id)
    remove_from_active_sessions(session_id)
    cookie.delete_from_response(response)

    return {"deleted": {"session": session}}
