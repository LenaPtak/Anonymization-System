from pydantic import BaseModel
from typing import List


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
    origin_type: str
    result_type: str


class Config(BaseModel):
    regex_categories: list
    expressions_to_anonymize: list
    expressions_to_highlight: list
    hide_people: bool
    make_raport: bool
    result_form: str
    file_configs: List[FileConfig]
