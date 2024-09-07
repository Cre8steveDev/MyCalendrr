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
    }
