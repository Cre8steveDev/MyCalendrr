"""
    Creates a new public appointment or updates one for visitors to book.

    Request Body:
        title (str): Title on appointment page
        description (str): Describe your service/appointment offering
        amount_payable (int): Amount charged for booking
        available_dates (List[date]): Available Dates

    Returns:
        JSON: Success message or appropriate error
"""

from app import db
from datetime import date
from app.models.user import User
from app.models.appointment import Appointment
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.utilities import get_validated_user, parse_appointment_data


appointment = Blueprint("appointment", __name__)


@appointment.route("/create", methods=["POST"])
@jwt_required()
def create_public_appointment():

    user = get_validated_user(get_jwt_identity())
    if not user:
        return jsonify({
            "success": False,
            "message": "Unable to validate user. Please log in again.",
        }), 403

    data = parse_appointment_data(request.json, str(user.id))
    
    try:
        new_appointment = Appointment(**data)
        db.session.add(new_appointment)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Appointment created successfully.",
            "appointment_id": str(new_appointment.id)
        }), 201
    except Exception as e:
        db.session.rollback()
        
        return jsonify({
            "success": False,
            "message": f"Error creating appointment: {str(e)}"
        }), 400


@appointment.route("/update/<uuid:appointment_id>", methods=["PUT"])
@jwt_required()
def update_public_appointment(appointment_id: str):

    user = get_validated_user(get_jwt_identity())
    if not user:
        return jsonify({
            "success": False,
            "message": "Unable to validate user. Please log in again.",
        }), 403

    appointment = Appointment.query.get(appointment_id)
    if not appointment or appointment.user_id != user.id:
        return jsonify({
            "success": False,
            "message": "Oops! Appointment not found or you don't have permission to update it.",
        }), 404

    data = parse_appointment_data(request.json, str(user.id))
    
    try:
        for key, value in data.items():
            setattr(appointment, key, value)
            
        db.session.commit()
        
        
        return jsonify({
            "success": True,
            "message": "Appointment updated successfully.",
            "appointment_id": str(appointment.id)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"Error updating appointment: {str(e)}"
        }), 400