from flask import Blueprint

index_bp = Blueprint('index', __name__)

@index_bp.route('/index', methods=['GET', 'POST'])
def index():
    return "hello world"