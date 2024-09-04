from app import db, bcrypt
from app.models.user import User
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    """
    Creates a new user.

    Request Body:
        full_name (str): User's full name.
        email (str): User's email.
        phone_number (str): User's phone number.
        profession (str): User's profession.

    Returns:
        JSON: Success message or appropriate error
    """
    data = request.json
    print(data)
    return jsonify(
            {
                "message": "An Error occured: Unable to create user. Try again later.",
                "user": None,
            }
        )
    existing_user = User.get_by_email(data["email"])
    if existing_user:
        return jsonify({"message": "Email already exists", "success": False}), 400

    try:
        new_user = User(
            full_name=data["full_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            profession=data["profession"],
            password=bcrypt.generate_password_hash(data["password"]),
        )

        # Add the new user object to the database session
        # And commit the changes to the db
        db.session.add(new_user)
        db.session.commit()

        # return the access token to the frontend
        return jsonify({"success": True, "message": "User created successfully"}), 201

    except:
        return jsonify(
            {
                "message": "An Error occured: Unable to create user. Try again later.",
                "user": None,
            }
        )


# Define the Login route
@auth.route("/login", methods=["POST"])
def login():
    print("TADADADA")
    # Get user's details
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    print("====================")
    print(email, password)
    print("====================")
    

    # Check if the user alreay exits
    existing_user = User.get_by_email(email)
    if not existing_user or not bcrypt.check_password_hash(
        existing_user.password, password
    ):
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Invalid or non-existent login credentials.",
                    "auth_token": None,
                }
            ),
            401,
        )

    auth_token = create_access_token(expires_delta=timedelta(hours=4), identity=email)

    # Return success message and the access token
    return jsonify(
        {
            "success": True,
            "message": "Login Successful! Welcome back.",
            "auth_token": auth_token,
        }
    )
