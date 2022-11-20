import uvicorn

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.responses import FileResponse
from fastapi import status, HTTPException

import os
from pdf import PDF

app = FastAPI()


@app.post("/api/files")
async def capture_uploaded_pdfs(files: list[UploadFile] = File(...)):
    """
    Endpoint to uploadu i zapisu plików PDF.
    """
    for uploaded_file in files:
        if uploaded_file.content_type != "application/pdf":
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f'File {uploaded_file.filename} is not application/pdf type.',
            )
    saved = []
    for uploaded_file in files:
        file_location = f"files/{uploaded_file.filename}"
        saved.append(file_location)
        with open(file_location, "wb+") as file_object:
            file_object.write(uploaded_file.file.read())
    return {"saved": [file_location for file_location in saved]}


@app.get("/api/file/{filename}")
async def send_processed_file_back(filename: str):
    directory = os.listdir("files/")
    if filename in directory and os.path.isfile("files/" + filename):
        pdf = PDF("files/" + filename)
        pdf.hide_sensitive("files/processed_" + filename)
        return FileResponse(path=f"files/processed_{filename}", filename=filename, media_type='application/pdf')
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


@app.get("/api/files")
async def list_files():
    directory = os.listdir("files/")
    return {"files": [filename for filename in directory if os.path.isfile("files/" + filename)]}


@app.get("/")
async def main():
    """
    Tymczasowy endpoint do testów przesyłania i zwracania przetworzonych plików
    TODO: Usunąć jak Lena skomunikuje nasze API
    """
    content = """
        <body>
        <form action="/api/files" enctype="multipart/form-data" method="post">
        <input name="files" type="file" multiple>
        <input type="submit">
        </form>
        </body>
    """
    return HTMLResponse(content=content)


if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=9876, reload=True)