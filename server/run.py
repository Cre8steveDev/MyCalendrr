from flask import jsonify
from app import create_app
from flask_cors import CORS

# Instantiate the app and then run
app = create_app()

# Configure CORS
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)


if __name__ == "__main__":
    app.run(debug=True)
