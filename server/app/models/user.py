from app import db
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy import Enum, Boolean, Integer, String, Column, BigInteger
from sqlalchemy.orm import relationship
import uuid
import random
from datetime import datetime, timedelta


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
        role (Enum)
        account_verified (Boolean)

    Methods:
        generate_otp(): Generate One-Time Password
        verify_otp(otp): Verify One-Time Password
        get_by_email(email): Get user by email
    """

    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    phone_number = Column(String(20), nullable=False)
    company_name = Column(String(100))
    profession = Column(String(100))
    title = Column(String(100))
    bank_name = Column(String(100))
    bank_account = Column(BigInteger)

    role = Column(Enum("ADMIN", "USER", name="role_type"), default="USER")
    account_verified = Column(Boolean, default=False)

    OTP = Column(Integer)
    OTP_expiry = Column(db.DateTime)

    # New column for storing dictionary-like data
    # JSONB is specific for Postgres.
    additional_info = Column(JSONB)

    # Relationship to Appointment
    # By setting uselist=False, you're telling
    # SQLAlchemy to expect a one-to-one relationship
    # between User and Appointment, rather than
    # a one-to-many relationship.
    appointment = relationship("Appointment", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User {self.full_name}>"

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
