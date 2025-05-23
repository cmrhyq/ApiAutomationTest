import time
from functools import wraps

from common.log import Logger
from utils.time.time_utils import timestamp

logger = Logger().get_logger()


def time_logger(func):
    """装饰器：记录测试执行时间"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        logger.info(f"The {func.__name__} method executed in {end_time - start_time:.4f} seconds")
        return result
    return wrapper


def running_time(func):
    """函数运行时间"""

    @wraps(func)
    def wrapper(*args, **kwargs):
        start = timestamp()
        res = func(*args, **kwargs)
        print("校验元素done！用时%.3f秒！" % (timestamp() - start))
        return res

    return wrapper


# 示例：测试类
class BaseTest:
    @time_logger
    def run_test(self):
        """模拟一个执行时间较长的测试"""
        time.sleep(2)
        logger.info("Test executed")


if __name__ == '__main__':
    # 运行测试
    test = BaseTest()
    test.run_test()