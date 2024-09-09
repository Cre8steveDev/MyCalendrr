import os


class Config:
    URI = ("MAIN_BRANCH_NEON_DATABASE_URI" if os.environ.get(
        "ENVIRONMENT", None) == "production" else
           "DEV_BRANCH_NEON_DATABASE_URI")

    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get(URI)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
