from typing import Any, Dict, Union
from app.models.user import User


def get_validated_user(user_identity: str) -> Union[User, None]:
    user = User.get_by_email(user_identity)
    if not user:
        return None
    return user


def parse_appointment_data(
    request_data: Dict[str, Any], user_id: str
) -> Dict[str, Any]:
    return {
        "user_id": user_id,
        "title": request_data.get("title"),
        "description": request_data.get("description"),
        "amount_payable": request_data.get("amount_payable"),
        "working_days": request_data.get("working_days"),
        "cover_image": request_data.get("cover_image"),
        "supporting_images": request_data.get("supporting_images", []),
    }

def parse_booking_data(request_data: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "appointment_title": request_data.get("appointment_title"),
        "appointment_id": request_data.get("appointment_id"),
        "booked_date": request_data.get("booked_date"),
        "timestamp": request_data.get("timestamp"),
        "transaction_reference": request_data.get("transaction_reference"),
        "full_name": request_data.get("full_name"),
        "phone_number": request_data.get("phone_number"),
        "email": request_data.get("email")
    }
