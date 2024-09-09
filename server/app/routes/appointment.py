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
from app.utils.utilities import get_validated_user, parse_appointment_data, parse_booking_data


appointment = Blueprint("appointment", __name__)


@appointment.route("/create", methods=["POST"])
@jwt_required()
def create_public_appointment():

    user = get_validated_user(get_jwt_identity())

    print("THE REQUESTING USER: ", user)

    if not user:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to validate user. Please log in again.",
                }
            ),
            403,
        )

    data = parse_appointment_data(request.json, str(user.id))

    try:
        new_appointment = Appointment(**data)
        db.session.add(new_appointment)
        db.session.commit()

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Appointment created successfully.",
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()

        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Error creating appointment. Please try again later.",
                }
            ),
            400,
        )


@appointment.route("/update/<uuid:appointment_id>", methods=["PUT"])
@jwt_required()
def update_public_appointment(appointment_id: str):

    user = get_validated_user(get_jwt_identity())
    if not user:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to validate user. Please log in again.",
                }
            ),
            403,
        )

    appointment = Appointment.query.get(appointment_id)
    if not appointment or appointment.user_id != user.id:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Oops! Appointment not found or you don't have permission to update it.",
                }
            ),
            404,
        )

    data = parse_appointment_data(request.json, str(user.id))

    try:
        for key, value in data.items():
            setattr(appointment, key, value)

        db.session.commit()

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Appointment updated successfully.",
                    "appointment_id": str(appointment.id),
                }
            ),
            200,
        )

    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"success": False, "message": f"Error updating appointment."}),
            400,
        )


@appointment.route("/get-all", methods=["GET"])
@jwt_required()
def get_all_appointments():

    user = get_validated_user(get_jwt_identity())

    if not user:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Unable to validate user. Please log in again.",
                }
            ),
            403,
        )

    try:
        # Fetch all appointments made by the user  and convert to dictionary 
        # using the instance method of the model
        all_appointments = Appointment.query.filter_by(user_id=user.id).all()
        appointments_dict = [appointment.to_dict_for_table() for appointment in all_appointments]

        return (
            jsonify(
                {
                    "success": True,
                    "message": "All appointments retreived successfully.",
                    "all_appointments": appointments_dict,
                }
            ),
            200,
        )
        
    except Exception as e:
        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Error retrieving appointments. Please try again later.",
                }
            ),
            400,
        )


@appointment.route("/get/<uuid:appointment_id>", methods=["GET"])
def get_appointment(appointment_id: str):
    try:
        appointment = Appointment.query.get(appointment_id)
        user = appointment.user
               
        if not appointment:
            return (
            jsonify(
                {"success": False, "message": f"Invalid Appointment ID or the appointment has been deleted.", "appointment": None}
            ),
            404,
        )

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Appointment retrieved successfully.",
                    "appointment": {"user": user.to_appointment_dict(), **appointment.to_dict()},
                }
            ),
            200,
        )

    except Exception as e:
        return (
            jsonify(
                {"success": False, "message": f"An Error occured. Please try again later.", "appointment": None}
            ),
            400,
        )


@appointment.route("/create-booking", methods=["POST"])
def book_appointment():

    data = parse_booking_data(request.json)
    appointment_id = data.get("appointment_id")
    transaction_reference = data.get("transaction_reference")
    
    if not appointment_id or not transaction_reference:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Invalid Booking Data. Please validate your entry.",
                }
            ),
            403,
        )
    
    print("BOOKING DATA: ", data)
    
    try:
        appointment = Appointment.query.get(appointment_id)
        
        if not appointment:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Oops! Something went wrong. Unable to validate appointment.",
                    }
                ),
                404,
            )
        book = appointment.book_date(data.get("booked_date"))
        
        if not book:
            return (jsonify(
                {
                    "success": False,
                    "message": "Sorry. The Date has already been booked.",
                }
            ),
            403,
        )
        
        appointment.user.bookings.append(data)        
        db.session.commit()
                
        # Send Mail to user who booked and the owner 
        # of the appointment page.

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Appointment Booked successfully.",
                    "appointment_id": str(appointment.id),
                }
            ),
            201,
        )

    except Exception as e:
        db.session.rollback()
        print("ERROR GOTTEN: ", e)
        return (
            jsonify({"success": False, "message": "An unknown Error occured. Try again later."}),
            400,
        )

