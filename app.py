from flask import Flask, jsonify, request
from flask_cors import CORS

from core.config.config import Config
from core.db import db
from application.api.v1.user import user_bp
from common.log import Logger
from core.middleware.request_logger import RequestLoggerMiddleware

app = Flask(__name__)
# 跨域，允许所有域
CORS(app)
# CORS(app, origins='http://example.com')

# 注册中间件
app.wsgi_app = RequestLoggerMiddleware(app.wsgi_app)

# 数据库配置
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

# 初始化数据库
db.init_app(app)

# 日志配置
logger = Logger().get_logger()

# 注册蓝图
app.register_blueprint(user_bp)

# 通用错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# 请求前处理
@app.before_request
def log_request_info():
    logger.info(f'Headers: {request.headers}')
    logger.info(f'Body: {request.get_data()}')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host=Config.APP_RUN_HOST, port=Config.APP_RUN_PORT, debug=True)