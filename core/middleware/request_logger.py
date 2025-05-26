import logging

logger = logging.getLogger(__name__)

class RequestLoggerMiddleware:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        logger.info(f'Request: {environ["REQUEST_METHOD"]} {environ["PATH_INFO"]}')
        return self.app(environ, start_response)