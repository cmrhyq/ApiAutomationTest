"""
@File time_utils.py
@Contact cmrhyq@163.com
@License (C)Copyright 2022-2025, AlanHuang
@Modify Time 2024/6/21 9:32
@Author Alan Huang
@Version 0.0.1
@Description None
"""
# !/usr/bin/env python3
# -*- coding:utf-8 -*-
import time
import datetime
from functools import wraps
import time
import random
from functools import wraps

from common.log import Logger

logger = Logger().get_logger()


def timestamp():
    """时间戳"""
    return time.time()


def dt_strftime(fmt="%Y%m"):
    """
    datetime格式化时间
    :param fmt "%Y%m%d %H%M%S
    """
    return datetime.datetime.now().strftime(fmt)


def sleep(seconds=1.0):
    """
    睡眠时间
    """
    time.sleep(seconds)
