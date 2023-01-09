import logging

from time import time
from fastapi import  Response
from starlette.requests import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from backend.consts import MINIMUM_MIDDLEWARE_SEC


class Timer(BaseHTTPMiddleware):
    """
    Middleware that measure and log time of request processing if higher than MINIMUM_MIDDLEWARE_SEC second
    """
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        start = time()
        response = await call_next(request)
        end = time()
        response_time = round(end - start, 2)
        if response_time > MINIMUM_MIDDLEWARE_SEC:
            logging.info(f"Time of response: {response_time}s.")
        return response


