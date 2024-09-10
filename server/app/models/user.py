import uuid
import random
from app import db
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy import Boolean, Integer, String, Column, BigInteger, Float
from datetime import datetime, timedelta
from sqlalchemy.orm import relationship
from sqlalchemy.ext.mutable import MutableList


class User(db.Model):
    """
    Represents a user.

    Attributes:
        id (UUID)
        full_name (String)
        email (String)
        phone_number (String)
        company_name (String)
        profession (String)
        title (String)
        bank_name (String)
        bank_account (Number)
        role (USER or ADMIN)
        account_verified (Boolean)

        bookings a json of booking type

    Methods:
        generate_otp(): Generate One-Time Password
        verify_otp(otp): Verify One-Time Password
        get_by_email(email): Get user by email

        # Create migration
        flask db migrate -m "comment"

        # Run migrations
        flask db upgrade
    """

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    phone_number = Column(String(20), nullable=False)

    photo_url = Column(String(100), default="/avatar.png")

    company_name = Column(String(100))
    profession = Column(String(100))
    title = Column(String(100))

    amount_earned = Column(Float, default=0.0)
    bank_name = Column(String(100))
    bank_account = Column(BigInteger)

    role = Column(String(15), default="USER")
    account_verified = Column(Boolean, default=False)

    OTP = Column(Integer)
    OTP_expiry = Column(db.DateTime)

    bookings = Column(MutableList.as_mutable(ARRAY(JSONB)), default=[])

    # Relationship to Appointment
    appointments = relationship("Appointment",
                                back_populates="user",
                                uselist=True)

    def __repr__(self):
        return f"<User {self.full_name}>"

    def topup_account(self, amount=0):
        if amount <= 0:
            return False
        self.amount_earned += amount
        db.session.commit()
        return True

    def generate_otp(self):
        self.OTP = random.randint(100000, 909090)
        self.OTP_expiry = datetime.now() + timedelta(minutes=10)
        db.session.commit()
        return self.OTP

    def verify_otp(self, otp):
        if self.OTP == otp and datetime.now() <= self.OTP_expiry:
            self.account_verified = True
            self.OTP = None
            self.OTP_expiry = None
            db.session.commit()
            return True
        return False

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    # Get the dictionary representation
    def to_dict(self):

        user_dict = {
            "full_name": self.full_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "company_name": self.company_name,
            "profession": self.profession,
            "title": self.title,
            "amount_earned": self.amount_earned,
            "bank_name": self.bank_name,
            "bank_account": self.bank_account,
            "bookings": self.bookings,
            "account_verified": self.account_verified,
            "photo_url": self.photo_url,
        }

        return user_dict

        # Get the dictionary representation

    def to_appointment_dict(self):

        user_dict = {
            "email": self.email,
            "full_name": self.full_name,
            "phone_number": self.phone_number,
            "company_name": self.company_name,
            "profession": self.profession,
            "title": self.title,
            "photo_url": self.photo_url,
        }

        return user_dict
