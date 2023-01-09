import os
import logging
from datetime import datetime
from fastapi import APIRouter
from fastapi_utils.tasks import repeat_every

from backend.globals import get_active_sessions, remove_from_active_sessions
from backend.dependencies import backend
from backend.utils import delete_files_from_storage
from backend.consts import (
    TXT_DIR_PATH,
    PDF_DIR_PATH,
    PNG_DIR_PATH,
    JPG_DIR_PATH,
    IMG_DIR_PATH,
)

router = APIRouter()

@router.on_event("startup")
async def create_directories():
    """
    Creates necessary directories at startup.
    """
    for context in [
        TXT_DIR_PATH,
        PDF_DIR_PATH,
        PNG_DIR_PATH,
        JPG_DIR_PATH,
        IMG_DIR_PATH,
    ]:
        if not os.path.exists(context):
            os.makedirs(context)


@router.on_event("startup")
@repeat_every(seconds=15 * 60)
async def clean_up_sessions():
    """
    Deletes all expired sessions and correlated files periodically.
    """
    session_time = 15 * 60  # 15 minutes of non-activity allowance
    expired_sessions = []
    for session in get_active_sessions():
        session_data = await backend.read(session)
        if session_data.updated_time + session_time < datetime.now().timestamp():
            remove_from_active_sessions(session)
            expired_sessions.append(session_data)

            expired_files = [file.unique_name for file in session_data.files]
            delete_files_from_storage(files_to_delete=expired_files)

            logging.info(f"Session: {session} have been deleted due to non-activity time expiration")
            await backend.delete(session)


@router.on_event("shutdown")
def clean_up_files():
    """
    Deletes all files in storage before server closes.
    """
    delete_files_from_storage()


