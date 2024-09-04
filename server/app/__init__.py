import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Load the environment variables
load_dotenv()

# Instantiate extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()


# Define a Factory function that
# returns the App Instance.
def create_app():
    # Instantiate the Flask app
    app = Flask(__name__)

    # Conditionally pick the Database URI based on the environment
    URI = (
        "MAIN_BRANCH_NEON_DATABASE_URI"
        if os.environ.get("ENVIRONMENT", None) == "production"
        else "DEV_BRANCH_NEON_DATABASE_URI"
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(URI)
    app.config["JWT_SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS "] = False

    # Register extensions on the app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors = CORS(app, origins=["http://localhost:5173"])

    # Bring in the defined blueprints for registration
    from app.routes.main import main
    from app.routes.auth import auth

    # Import your models before calling db.create_all
    from .models.user import User
    from .models.appointment import Appointment

    app.register_blueprint(main, url_prefix="/api/v1/")
    app.register_blueprint(auth, url_prefix="/api/v1/auth")

    with app.app_context():
        db.create_all()

        return app
