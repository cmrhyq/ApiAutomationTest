from flask import Flask
from flask_cors import CORS

from controller.index import index_bp

app = Flask(__name__)
# 跨域，允许所有域
CORS(app)
# CORS(app, origins='http://example.com')

app.register_blueprint(index_bp)

if __name__ == '__main__':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ApiAutoDb.db'
    app.run(host="0.0.0.0", port=5000, debug=True)