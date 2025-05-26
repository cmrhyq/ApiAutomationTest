from flask import Blueprint

index_bp = Blueprint('index', __name__)

@index_bp.route('/', methods=['GET', 'POST'])
def index(name):
    return f"hello world, {name}"