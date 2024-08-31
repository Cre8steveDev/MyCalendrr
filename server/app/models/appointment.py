"""
Appointment Database model
"""

import uuid
from app import db
from datetime import date
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import Column, String, Text, Numeric, ForeignKey, Date


class Appointment(db.Model):
    """
    Represents an appointment.

    Attributes:
        id (UUID)
        user_id (UUID)
        title (String)
        description (Text)
        amount_payable (Numeric)
        available_dates (MutableList[Date])
        booked_dates (MutableList[Date])

    Methods:
        add_available_date(date): Add available date
        remove_available_date(date): Remove available date
        book_date(date): Book a date
        cancel_booking(date): Cancel a booking
    """

    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    amount_payable = Column(Numeric(10, 2), nullable=False)  # 2d.p
    available_dates = Column(MutableList.as_mutable(ARRAY(Date)))
    booked_dates = Column(MutableList.as_mutable(ARRAY(Date)))

    # Relationship to User
    user = relationship("User", back_populates="appointment")

    def __repr__(self):
        return f"<Appointment {self.title}>"

    def add_available_date(self, new_date):
        if isinstance(new_date, date) and new_date not in self.available_dates:
            self.available_dates.append(new_date)
            return True
        return False

    def remove_available_date(self, date_to_remove):
        if date_to_remove in self.available_dates:
            self.available_dates.remove(date_to_remove)
            return True
        return False

    def book_date(self, date_to_book):
        if date_to_book in self.available_dates:
            self.available_dates.remove(date_to_book)
            self.booked_dates.append(date_to_book)
            return True
        return False

    def cancel_booking(self, date_to_cancel):
        if date_to_cancel in self.booked_dates:
            self.booked_dates.remove(date_to_cancel)
            self.available_dates.append(date_to_cancel)
            return True
        return False
