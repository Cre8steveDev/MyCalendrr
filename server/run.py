from app import create_app

# Instantiate the app and then run
app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
