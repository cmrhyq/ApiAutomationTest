from flask import Flask

from controller.index import index_bp

app = Flask(__name__)
app.register_blueprint(index_bp)

if __name__ == '__main__':
    app.run(debug=True)