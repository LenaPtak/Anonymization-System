import logging
from uuid import UUID
from fastapi import Depends, APIRouter, HTTPException
from starlette import status
from starlette.responses import FileResponse

from backend.dependencies import cookie
from backend.globals import get_raport

router = APIRouter(prefix="/api", tags=["Raport"])


@router.get("/raport")
async def read_raport(session_id: UUID = Depends(cookie)):
    """
    Read raport for current session
    """
    if raport_path := await get_raport(session_id):
        raport_file = FileResponse(
            path=raport_path,
            filename="raport.txt",
            media_type="text/plain"
        )
        logging.info(f"Sending raport for session {session_id}")
        return raport_file

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Raport for session {session_id} not created yet. Please send config and process files."
    )
