import logging
from uuid import UUID
from fastapi import Depends, APIRouter

from backend.pydantics import Config
from backend.dependencies import cookie
from backend.globals import add_config, get_config

router = APIRouter(prefix="/api", tags=["Config"])


@router.post("/config")
def create_config(config: Config, session_id: UUID = Depends(cookie)):
    """
    Creates configuration for processed files
    """
    add_config(session_id, config)
    logging.info(f"Config for session {session_id} has been created.")
    return config
