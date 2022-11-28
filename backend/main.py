import os
import cv2

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pdf import PDF
from starlette.responses import RedirectResponse

# TODO(Jan): Make machinelearning a module

# temporary until module is made - adds machinelearning/ to pythonpath
from pathlib import Path
import sys
sys.path.insert(1, str(Path(__file__).parent / "./machinelearning"))

# TODO(Jan): move that to top and remove flake suppresion
from machinelearning.yolo_wrapper import YoloWrapper  # noqa: E402


app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def docs_redirect():
    return RedirectResponse(url='/docs')


@app.post("/api/files")
async def capture_uploaded_pdfs(files: list[UploadFile] = File()):  # noqa B008
    """
    Endpoint to uploadu i zapisu plików PDF.
    """
    for uploaded_file in files:
        if uploaded_file.content_type != "application/pdf":
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"File {uploaded_file.filename} is not application/pdf type.",
            )
    saved = []
    for uploaded_file in files:
        file_location = f"files/{uploaded_file.filename}"
        saved.append(file_location)
        with open(file_location, "wb+") as file_object:
            file_object.write(uploaded_file.file.read())
    return {"saved": saved}


@app.get("/api/file/{filename}")
async def send_processed_file_back(filename: str):
    directory = os.listdir("files/")
    if filename in directory and os.path.isfile("files/" + filename):
        pdf = PDF("files/" + filename)
        images = pdf.extract_images()
        # if there is something to process, instantiate the model(s) and make them do their thing
        if images is not []:
            # For now only Yolo is merged, therefore this is the only model that is currently implemented
            yw = YoloWrapper()
            for image_dir in images:
                image = cv2.imread(image_dir)
                # I think it was JPEGS that needed flipping, TODO(Jan): Check that
                if image_dir[-4:] == '.JPG' or image_dir[-4:] == '.jpg' or image_dir[-5:] == '.jpeg' or image_dir[-5:] == '.JPEG':
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                results = yw.model(image)
                image = yw.process_results(results, image)
                cv2.imwrite(image_dir, image)

        pdf.hide_sensitive("files/processed_" + filename)
        return FileResponse(
            path=f"files/processed_{filename}",
            filename=filename,
            media_type="application/pdf",
        )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


@app.get("/api/files")
async def list_files():
    directory = os.listdir("files/")
    return {
        "files": [
            filename
            for filename in directory
            if os.path.isfile("files/" + filename)
        ]
    }


if __name__ == "__main__":
    uvicorn.run("backend:app", host="0.0.0.0", port=9876, reload=True)
