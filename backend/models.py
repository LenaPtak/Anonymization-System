from pydantic import BaseModel
from typing import Literal, List

AllowedFileType = Literal[
    "text/plain",
    "image/png",
    "image/jpeg",
    "application/pdf",
]
AllowedResultType = Literal[
    "default",
    "merge",
    "split",
]


class UserFile(BaseModel):
    origin_name: str
    unique_name: str
    location: str
    type: str
    size: str
    date: str


class UserSession(BaseModel):
    """
    Model of user session
    """

    files_available: bool   # Information, if the files are already in storage
    config_available: bool  # Information, if configs for each file are already in storage
    created_at: float       # Information, about the time of creation
    updated_at: float       # Information, about the time of last activity
    files: List[UserFile]


class FileConfig(BaseModel):
    origin_name: str
    unique_name: str
    origin_type: AllowedFileType
    result_type: AllowedFileType


class Config(BaseModel):
    # Tab 2
    process_model: bool
    process_categories: List
    process_expressions: List

    # Tab 3
    file_configs: List[FileConfig]

    # Tab 4
    result_type: AllowedResultType
