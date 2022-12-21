import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from time import time
from uuid import UUID, uuid4

import uvicorn
from fastapi import (
    Depends,
    FastAPI,
    File,
    HTTPException,
    Response,
    UploadFile,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.frontends.implementations import (
    CookieParameters,
    SessionCookie,
)
from fastapi_sessions.frontends.implementations.cookie import SameSiteEnum
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_utils.tasks import repeat_every
from pdf import PDF, TXT
from response_models import UserFile, UserSession
from starlette.middleware.base import (
    BaseHTTPMiddleware,
    RequestResponseEndpoint,
)
from starlette.requests import Request
from starlette.responses import FileResponse, RedirectResponse

# TODO(Jan): MAKE MACHINELEARNING A MODULE

# temporary until module is made - adds machinelearning/ to pythonpath

sys.path.insert(1, str(Path(__file__).parent / "./machinelearning"))

import cv2

# TODO(Jan): REMOVE FLAKE SUPPRESSION
from machinelearning.yolo_wrapper import YoloWrapper  # noqa: E402

logging.basicConfig(
    format="%(asctime)s - %(message)s",
    datefmt="%m/%d/%Y, %H:%M:%S",
    level=logging.INFO,
)

TXT_DIR_PATH = "storage/txt/"
PNG_DIR_PATH = "storage/png/"
JPG_DIR_PATH = "storage/jpg/"
PDF_DIR_PATH = "storage/pdf/"

ALLOWED_FILE_TYPES = {
    "text/plain",
    "image/png",
    "image/jpeg",
    "application/pdf",
}
CONTENT_TYPE_TO_PATH_MAP = {
    "text/plain": TXT_DIR_PATH,
    "image/png": PNG_DIR_PATH,
    "image/jpeg": JPG_DIR_PATH,
    "application/pdf": PDF_DIR_PATH,
}
CONTENT_TYPE_TO_EXTENSION_MAP = {
    "text/plain": ".txt",
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "application/pdf": ".pdf",
}


class Timer(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        start = time()
        response = await call_next(request)
        end = time()
        response_time = round(end - start, 2)
        if response_time > 0.5:
            logging.info(f"Time of response: {response_time}s.")
        return response


class BasicVerifier(SessionVerifier[UUID, UserSession]):
    def __init__(
        self,
        *,
        identifier: str,
        auto_error: bool,
        backend: InMemoryBackend[UUID, UserSession],
        auth_http_exception: HTTPException,
    ):
        self._identifier = identifier
        self._auto_error = auto_error
        self._backend = backend
        self._auth_http_exception = auth_http_exception

    @property
    def identifier(self):
        return self._identifier

    @property
    def backend(self):
        return self._backend

    @property
    def auto_error(self):
        return self._auto_error

    @property
    def auth_http_exception(self):
        return self._auth_http_exception

    def verify_session(self, model: UserSession) -> bool:
        """If the session exists, it is valid"""
        return True


cookie_params = CookieParameters(samesite=SameSiteEnum.none)
cookie = SessionCookie(
    cookie_name="safe-file-cookie",
    identifier="general_verifier",
    auto_error=True,
    secret_key="DONOTUSE",
    cookie_params=cookie_params,
)

backend = InMemoryBackend[UUID, UserSession]()
verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=backend,
    auth_http_exception=HTTPException(
        status_code=403, detail="invalid session"
    ),
)


def convert_bytes(num: float) -> str:
    """
    Funkcja konwertująca jednostkę wielkości pliku.

    :param num: Wielkość pliku.
    :return: Wielkość w reprezentacji tekstowej z odpowiednią jednostką.
    """
    for x in ["bytes", "KB", "MB", "GB", "TB"]:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0


def delete_files_from_storage(files_to_delete: list[str] = None):
    """
    Deletes files correlated with session and given filenames.
    Returns response with information about deleted files.
    """
    for context in [TXT_DIR_PATH, PDF_DIR_PATH, PNG_DIR_PATH, JPG_DIR_PATH]:
        files = os.listdir(context)
        for file in files:
            if files_to_delete and file not in files_to_delete:
                continue
            os.remove(context + file)
            logging.info(f"File: {file} have been deleted.")


async def process_file(file: UserFile) -> FileResponse:
    processed_type = file.type
    processed_name = "processed_" + file.unique_name
    processed_path = CONTENT_TYPE_TO_PATH_MAP[file.type] + processed_name

    if processed_type == "application/pdf":
        pdf = PDF(file.location)
        images = pdf.extract_images()
        if images[0]:
            # TODO(Tomasz): SIZE OF PROCESSES FILES IS WAY TOO BIG
            yolo_wrapper = YoloWrapper()
            for i, image_dir in enumerate(images[0]):
                image = cv2.imread(image_dir)
                if image_dir[-4:] == '.png' or image_dir[-4:] == '.PNG':
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

                results = yolo_wrapper.model(image)
                image = yolo_wrapper.process_results(results, image)
                cv2.imwrite(image_dir, image)
                pdf.reintroduce_image(image_dir, images[1][i])
        pdf.hide_sensitive(processed_path)

    elif processed_type == "text/plain":
        txt = TXT(file.location)
        txt.hide_sensitive(processed_path)

    else:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Currently only pdf processing is possible.",
        )

    return FileResponse(
        path=processed_path,
        filename=processed_name,
        media_type=processed_type,
    )


app = FastAPI()

active_sessions = set()

origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(Timer)


@app.get("/")
async def read_docs():
    """
    Redirect from FastAPI server root to documentation
    """
    return RedirectResponse(url="/docs")


@app.post("/api/session")
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
    active_sessions.add(session_id)

    await backend.create(session_id, session)
    cookie.attach_to_response(response, session_id)

    return session


@app.get("/api/session", dependencies=[Depends(cookie)])
async def read_session(session_data: UserSession = Depends(verifier)):
    """
    Returns response with current session details.
    """
    return session_data


@app.get("/api/sessions")
async def read_sessions():
    """
    Returns response with all sessions in details.
    """
    sessions = []
    for session in active_sessions:
        data = await backend.read(session)
        if not data:
            raise HTTPException(status_code=status.HTTP_204_NO_CONTENT)
        sessions.append(data.dict())

    return {"sessions": sessions}


@app.delete("/api/session")
async def delete_session(
    response: Response, session_id: UUID = Depends(cookie)
):
    """
    Deletes current user session.
    Returns response with deleted session details.
    """
    session = await backend.read(session_id)
    expired_files = [file.unique_name for file in session.files]
    delete_files_from_storage(files_to_delete=expired_files)

    await backend.delete(session_id)
    active_sessions.remove(session_id)
    cookie.delete_from_response(response)

    return {"deleted": {"session": session}}


@app.post("/api/files")
async def create_files(
    session_id: UUID = Depends(cookie),
    uploaded_files: list[UploadFile] = File(),
):  # noqa B008
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


@app.get("/api/files")
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


@app.get("/api/file/{filename}")
async def read_files(filename: str, session_id: UUID = Depends(cookie)):
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


@app.delete("/api/files")
async def delete_files(session_id: UUID = Depends(cookie)):
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


@app.delete("/api/file/{filename}")
async def delete_files(filename: str, session_id: UUID = Depends(cookie)):
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


@app.on_event("startup")
@repeat_every(seconds=15 * 60)
async def clean_up_sessions():
    """
    Deletes all expired sessions and correlated files periodically.
    """
    session_time = 15 * 60  # 15 minutes of non-activity allowance
    expired_sessions = []
    for session in active_sessions:

        session_data = await backend.read(session)
        if (
            session_data.updated_time + session_time
            < datetime.now().timestamp()
        ):

            active_sessions.remove(session)
            expired_sessions.append(session_data)

            expired_files = [file.unique_name for file in session_data.files]
            delete_files_from_storage(files_to_delete=expired_files)

            logging.info(
                f"Session: {session} have been deleted due to non-activity time expiration"
            )
            await backend.delete(session)


@app.on_event("shutdown")
def clean_up_files():
    """
    Deletes all files in storage before server closes.
    """
    delete_files_from_storage()


if __name__ == "__main__":
    # Let it exist for local debugging
    uvicorn.run(app, host="0.0.0.0", port=8000)
