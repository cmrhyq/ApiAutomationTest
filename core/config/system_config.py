# 全局通用配置类
import os


class BaseConfig(object):
    """项目配置核心类"""
    # 调试模式
    DEBUG = True
    APP_RUN_HOST= "127.0.0.1"
    APP_RUN_PORT = 5000

    # 配置密钥
    SECRET_KEY = os.urandom(24)

    # 数据库连接格式
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user:password@localhost:3306/test?charset=utf8"
    # 动态追踪修改设置，如未设置只会提示警告
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # 查询时会显示原始SQL语句
    SQLALCHEMY_ECHO = False
    # 数据库连接池的大小
    SQLALCHEMY_POOL_SIZE = 10
    # 指定数据库连接池的超时时间
    SQLALCHEMY_POOL_TIMEOUT = 10
    # 控制在连接池达到最大值后可以创建的连接数。当这些额外的 连接回收到连接池后将会被断开和抛弃。
    SQLALCHEMY_MAX_OVERFLOW = 2

    # 配置redis
    # 项目上线以后，这个地址就会被替换成真实IP地址，mysql也是
    REDIS_HOST = 'your host'
    REDIS_PORT = "your"
    REDIS_PASSWORD = 'your password'
    REDIS_POLL = 10

class DevelopmentConfig(BaseConfig):
    APP_RUN_HOST= "0.0.0.0"
    APP_RUN_PORT = 5001
    SQLALCHEMY_DATABASE_URI="sqlite:///C:/Users/EDY/Desktop/code/ApiAutomationTest/core/db/instance/ApiAutoDb.db"

class ProductionConfig(BaseConfig):
    APP_RUN_HOST= "127.0.0.1"
    APP_RUN_PORT = 5001
    SQLALCHEMY_DATABASE_URI = "sqlite:///C:/Users/EDY/Desktop/code/ApiAutomationTest/core/db/instance/ApiAutoDb.db"

class TestingConfig(BaseConfig):
    APP_RUN_HOST= "127.0.0.1"
    APP_RUN_PORT = 5002
    SQLALCHEMY_DATABASE_URI = "sqlite:///C:/Users/EDY/Desktop/code/ApiAutomationTest/core/db/instance/ApiAutoDb.db"


system_config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'test': TestingConfig
}