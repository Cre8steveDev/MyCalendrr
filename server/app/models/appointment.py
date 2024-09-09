"""
Appointment Database model
"""

import uuid
from app import db
from datetime import datetime
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
        working_days (MutableList[String])
        booked_dates (MutableList[Date])

    Methods:
        book_date(date): Book a date
        cancel_booking(date): Cancel a booking
    """

    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = Column(UUID(as_uuid=True),
                     ForeignKey("users.id", ondelete="CASCADE"),
                     nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    amount_payable = Column(Numeric(10, 2), nullable=False)  # 2d.p

    working_days = Column(MutableList.as_mutable(ARRAY(String(28))),
                          nullable=False)

    booked_dates = Column(MutableList.as_mutable(ARRAY(Date)), default=[])

    cover_image = Column(Text)
    supporting_images = Column(MutableList.as_mutable(ARRAY(Text)))

    user = relationship("User", back_populates="appointments")

    def __repr__(self):
        return f"<Appointment {self.title}>"

    def book_date(self, date_to_book):
        dt = datetime.fromisoformat(date_to_book)

        if not self.booked_dates:
            self.booked_dates = []

        if dt not in self.booked_dates:
            self.booked_dates.append(dt)
            return True
        return False

    def cancel_booking(self, date_to_cancel):
        dt = datetime.fromisoformat(date_to_cancel)

        if self.booked_dates and date_to_cancel in self.booked_dates:
            self.booked_dates.remove(dt)
            return True
        return False

    # Instance method to get the dictionary representation
    def to_dict(self):
        return {
            "id":
            str(self.id),
            "user_id":
            str(self.user_id),
            "title":
            self.title,
            "description":
            self.description,
            "amount_payable":
            float(self.amount_payable),
            "working_days":
            self.working_days,
            "cover_image":
            self.cover_image,
            "supporting_images":
            self.supporting_images,
            "booked_dates":
            ([date.isoformat()
              for date in self.booked_dates] if self.booked_dates else []),
        }

    def to_dict_for_table(self):
        bookings = len(self.booked_dates) if self.booked_dates else 0
        return {
            "id": str(self.id),
            "title": self.title,
            "amount_payable": float(self.amount_payable),
            "bookings": bookings
        }
