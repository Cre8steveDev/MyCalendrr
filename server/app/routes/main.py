from app import db
from datetime import date
from app.models.user import User
from app.models.appointment import Appointment
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.utilities import get_validated_user, parse_appointment_data

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return "Hello and welcome to the home page of the server."


@main.route("/dashboard", methods=["GET"])
@jwt_required()
def get_dashboard_data():

    user = None
    print("HIT THE ENDPOINT!!!", get_jwt_identity())

    try:
        user = get_validated_user(get_jwt_identity())

        # appointments = [appointment.to_dict() for appointment in user.appointments]
        # print("APPOINTMENTS: ", appointments)

        if not user:
            return (
                jsonify(
                    {
                        "success": False,
                        "message": "Unable to validate user. Please log in again.",
                        "data": None,
                    }
                ),
                403,
            )

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Data Retrieved for User",
                    "data": {
                        "appointments": len(user.appointments),
                        "amount_earned": user.amount_earned,
                        "bookings": user.bookings,
                    },
                }
            ),
            200,
        )

    except Exception as e:
        print(e)

        return (
            jsonify(
                {
                    "success": False,
                    "message": f"Error retrieving Dashboard Data.",
                    "data": None,
                }
            ),
            400,
        )
