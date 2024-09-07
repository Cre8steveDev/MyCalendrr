import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# Load the environment variables
load_dotenv("../")

# Instantiate extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__)

    # Conditionally pick the Database URI based on the environment
    URI = (
        "MAIN_BRANCH_NEON_DATABASE_URI"
        if os.environ.get("ENVIRONMENT", None) == "production"
        else "DEV_BRANCH_NEON_DATABASE_URI"
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(URI)
    app.config["JWT_SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Register extensions on the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Bring in the defined blueprints for registration
    from app.routes.main import main
    from app.routes.auth import auth
    from app.routes.appointment import appointment

    # Import your models before calling db.create_all
    from .models.user import User
    from .models.appointment import Appointment

    app.register_blueprint(main, url_prefix="/api/v1/")
    app.register_blueprint(auth, url_prefix="/api/v1/auth")
    app.register_blueprint(appointment, url_prefix="/api/v1/appointment")

    # Server health check
    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"success": True}), 200

    with app.app_context():
        db.create_all()

    return app
