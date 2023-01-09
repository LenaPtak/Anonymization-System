import os
from uuid import UUID, uuid4
from datetime import datetime
from fastapi import Depends, File, HTTPException, UploadFile, status, APIRouter

from backend.pydantics import UserFile
from backend.dependencies import backend, cookie
from backend.utils import delete_files_from_storage, convert_bytes, process_file
from backend.consts import (
    ALLOWED_FILE_TYPES,
    CONTENT_TYPE_TO_PATH_MAP,
    CONTENT_TYPE_TO_EXTENSION_MAP,
)

router = APIRouter(prefix="/api", tags=["Files"])


@router.post("/files")
async def create_files(session_id: UUID = Depends(cookie), uploaded_files: list[UploadFile] = File()):
    """
    Saves given files correlated with session in an internal storage.
    Returns additional information about saved files.
    """
    for file in uploaded_files:
        if file.content_type not in ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"File '{file.filename}' is not allowed type.",
            )

    saved_files = []
    for file in uploaded_files:
        date = str(datetime.now())
        type = file.content_type

        extension = CONTENT_TYPE_TO_EXTENSION_MAP[type]

        origin_name = file.filename
        unique_name = str(uuid4()) + extension

        location = CONTENT_TYPE_TO_PATH_MAP[file.content_type] + unique_name

        with open(location, "wb+") as new_file:
            new_file.write(file.file.read())

        size = convert_bytes(os.path.getsize(location))

        saved_file = UserFile(
            unique_name=unique_name,
            origin_name=origin_name,
            location=location,
            type=type,
            size=size,
            date=date,
        )
        saved_files.append(saved_file)

    session = await backend.read(session_id)
    session.files = saved_files
    await backend.update(session_id, session)

    return saved_files


@router.get("/files")
async def read_files(session_id: UUID = Depends(cookie)):
    """
    Returns response with all processed files correlated with session as an attachment.
    """
    session = await backend.read(session_id)
    response_files = []
    saved_files = []
    for file in session.files:
        response_file = await process_file(file)
        response_files.append(response_file)

        saved_file = UserFile(
            origin_name=file.origin_name,
            unique_name=response_file.filename,
            location=response_file.path,
            type=response_file.media_type,
            size=convert_bytes(os.path.getsize(response_file.path)),
            date=str(datetime.now()),
        )
        saved_files.append(saved_file)

    if not response_files:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    session.files += saved_files
    await backend.update(session_id, session)

    return response_files


@router.get("/file/{filename}")
async def read_file(filename: str, session_id: UUID = Depends(cookie)):
    """
    Returns response with processed file correlated with session and given filename as an attachment.
    """
    session = await backend.read(session_id)
    for saved_file in session.files:
        if saved_file.unique_name == filename:
            file = saved_file
            break
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    response_file = await process_file(file=file)
    saved_file = UserFile(
        origin_name=file.origin_name,
        unique_name=response_file.filename,
        location=response_file.path,
        type=response_file.media_type,
        size=convert_bytes(os.path.getsize(response_file.path)),
        date=str(datetime.now()),
    )

    session.files += [saved_file]
    await backend.update(session_id, session)

    return response_file


@router.delete("/files")
async def delete_multiple_files(session_id: UUID = Depends(cookie)):
    """
    Deletes files correlated with session and given filename.
    Returns response with deleted files details.
    """
    session = await backend.read(session_id)

    files = session.files
    files_to_delete = [file.unique_name for file in files]

    session.files = []
    await backend.update(session_id, session)

    if not files_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    delete_files_from_storage(files_to_delete=files_to_delete)
    return {"deleted": files}


@router.delete("/file/{filename}")
async def delete_file(filename: str, session_id: UUID = Depends(cookie)):
    """
    Deletes file correlated with session and given filename.
    Returns response with unique name of deleted file.
    """
    session = await backend.read(session_id)

    for saved_file in session.files:
        if saved_file.unique_name == filename:
            file = saved_file
            session.files.remove(saved_file)
            await backend.update(session_id, session)
            break
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    files_to_delete = [file.unique_name]
    delete_files_from_storage(files_to_delete=files_to_delete)
    return {"deleted": file}
