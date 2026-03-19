
import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

app = Flask(__name__)

# ✅ CORS BIEN CONFIGURADO (IMPORTANTE)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.url_map.strict_slashes = False

# DB
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

Migrate(app, db)
db.init_app(app)

# Admin + commands
setup_admin(app)
setup_commands(app)

# Routes
app.register_blueprint(api, url_prefix='/api')

# Error handler
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Root
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Static
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    return send_from_directory('../dist/', path)

# Run
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True)