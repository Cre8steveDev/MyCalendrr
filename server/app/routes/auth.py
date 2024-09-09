from app import db, bcrypt
from app.models.user import User
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    existing_user = User.get_by_email(data["email"])

    if existing_user:
        return jsonify({
            "message": "Email already exists",
            "success": False
        }), 400

    print(data)

    try:
        hashed_password = bcrypt.generate_password_hash(
            data["password"]).decode("utf-8")
        new_user = User(
            full_name=data["full_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()

        OTP = new_user.generate_otp()

        print("GENERATED OTP: ", OTP)
        print("HASHED PASSWORD: ", hashed_password)

        return jsonify({
            "success": True,
            "message": "User created successfully"
        }), 201

    except Exception as e:
        print(f"Registration error: {e}")
        db.session.rollback()
        return (
            jsonify({
                "message":
                "An error occurred: Unable to create user. Try again later.",
                "success": False,
            }),
            500,
        )


# Define the Login route
@auth.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try:
        existing_user = User.get_by_email(email)
        if not existing_user:
            return (
                jsonify({
                    "success": False,
                    "message": "Invalid or non-existent login credentials.",
                    "auth_token": None,
                }),
                401,
            )

        valid_password = bcrypt.check_password_hash(existing_user.password,
                                                    password)
        if not valid_password:
            return (
                jsonify({
                    "success": False,
                    "message": "Invalid login credentials.",
                    "auth_token": None,
                    "user": None,
                }),
                401,
            )

        token_duration = (timedelta(days=30) if request.json.get(
            "remember_me", None) else timedelta(hours=4))

        auth_token = create_access_token(expires_delta=token_duration,
                                         identity=email)

        return jsonify({
            "success": True,
            "message": "Login Successful! Welcome back.",
            "auth_token": auth_token,
            "user": {
                "full_name": existing_user.full_name,
            },
        })

    except Exception as e:
        print(f"Login error: {e}")
        return (
            jsonify({
                "success": False,
                "message": "An error occurred during login. Please try again.",
                "auth_token": None,
                "user": None,
            }),
            500,
        )
