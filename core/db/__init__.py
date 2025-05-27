from flask_sqlalchemy import SQLAlchemy

# 加载数据库，在这里加载是为了防止循环引用
db = SQLAlchemy()