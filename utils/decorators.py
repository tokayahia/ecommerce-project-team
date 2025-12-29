
from flask import Blueprint

protected_bp = Blueprint('protected', __name__)

@protected_bp.route('/protected')
def protected():
    return {"message": "This is a protected route"}
