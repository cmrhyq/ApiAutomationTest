import requests

from common.log import Logger

logger = Logger().get_logger()


class RequestService(object):
    def __init__(self):
        self.session = requests.Session()

    def request(self, method, url, params=None, cookies=None, data=None, headers=None, **kwargs):
        try:
            response = self.session.request(
                method=method,
                url=url,
                params=params,
                data=data,
                cookies=cookies,
                headers=headers,
                verify=False,
                **kwargs
            )
            return response
        except Exception as e:
            logger.error(e)
            return None