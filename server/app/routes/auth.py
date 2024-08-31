from flask import Blueprint, jsonify, request
from app import db
from app.models.user import User

auth = Blueprint('user', __name__)

@auth.route('/register', methods=['POST'])
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
    existing_user = User.get_by_email(data['email'])
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        phone_number=data['phone_number'],
        profession=data['profession']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'user': {'id': "4848484829", 'full_name': new_user.full_name, 'email': new_user.email}}), 201


@auth.route('/login')
def login():
    return jsonify({"message": "Yeeeeah!", "status": "I gat yaaaa for logins!"})
