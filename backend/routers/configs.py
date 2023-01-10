import logging
from uuid import UUID
from fastapi import Depends, APIRouter

from backend.pydantics import Config
from backend.dependencies import cookie
from backend.globals import add_config, get_config

router = APIRouter(prefix="/api", tags=["Config"])


@router.post("/config")
async def create_config(config: Config, session_id: UUID = Depends(cookie)):
    """
    Creates configuration for processed files
    """
    add_config(session_id, config)
    logging.info(f"Config for session {session_id} has been created.")
    return config

"""
{
  "regex_categories": [   
    "Numer karty kredytowej",
    "Numer rachunku bankowego",
    "Numer REGON",
    "Numer NIP",
    "PESEL"
  ],
  "expressions_to_anonymize": [ 
    "Lena Ptak",
    "145226",
    "61-695"
  ],
  "expressions_to_highlight": [ 
    "mango",
    "lasagne",
    "i like foodie"
  ],
  "hide_people": true,
  "make_raport": true,
  "result_form": "merge",
  "file_configs": [
    {
      "origin_name": "random.txt",
      "unique_name": "32g12gh1-hbg3v12-dsadsa3-3212232",
      "origin_type": "text/plain",
      "result_type": "application/pdf"
    },
    {
      "origin_name": "cokolwiek.png",
      "unique_name": "31g12gh1-hbg3v12-ds2dsa3-3212232",
      "origin_type": "image/png",
      "result_type": "application/pdf"
    }
  ]
}
"""