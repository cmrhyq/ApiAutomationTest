import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    APP_RUN_HOST = os.getenv('APP_RUN_HOST')
    APP_RUN_PORT = os.getenv('APP_RUN_PORT')

    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///ApiAutoDb.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    SECRET_KEY = os.getenv('SECRET_KEY', '99819')
